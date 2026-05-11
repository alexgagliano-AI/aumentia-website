import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { invitationEmail } from "@/lib/email-templates";
import { ROLE_LABELS_I18N, type Lang } from "@/lib/i18n-diagnostic";
import { ROLE_LABELS } from "@/lib/questions";
import type { Role } from "@/lib/questions";

function getResend() { return new Resend(process.env.RESEND_API_KEY); }

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("audits")
    .select("*, companies(*), respondents(*)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { company, respondents, language = "fr" } = await req.json();
  const lang: Lang = ["fr", "en", "it"].includes(language) ? language : "fr";

  const serviceClient = createServiceClient();

  const { data: companyData, error: companyError } = await serviceClient
    .from("companies")
    .insert({
      name: company.name,
      industry: company.industry || null,
      size: company.size || null,
      country: company.country || "Belgique",
      region: company.region || null,
    })
    .select()
    .single();

  if (companyError) return NextResponse.json({ error: companyError.message }, { status: 500 });

  const { data: auditData, error: auditError } = await serviceClient
    .from("audits")
    .insert({
      company_id: companyData.id,
      title: `Diagnostic IA — ${company.name}`,
      status: "active",
      created_by: user.id,
      language: lang,
    })
    .select()
    .single();

  if (auditError) return NextResponse.json({ error: auditError.message }, { status: 500 });

  const { data: respondentData, error: respondentError } = await serviceClient
    .from("respondents")
    .insert(
      respondents.map((r: { name: string; email: string; role: Role }) => ({
        audit_id: auditData.id,
        name: r.name,
        email: r.email,
        role: r.role,
        status: "pending",
      }))
    )
    .select();

  if (respondentError) return NextResponse.json({ error: respondentError.message }, { status: 500 });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://aumentia.ai";
  const senderName = user.email?.split("@")[0] ?? "Alexandre";

  const emailResults = await Promise.allSettled(
    (respondentData ?? []).map(async (r: { id: string; name: string; email: string; role: Role; token: string }) => {
      const link = `${appUrl}/respond/${r.token}`;
      const roleLabel = ROLE_LABELS_I18N[lang][r.role] ?? ROLE_LABELS[r.role];
      const { subject, html } = invitationEmail({
        name: r.name,
        companyName: company.name,
        roleLabel,
        link,
        senderName,
        lang,
      });
      await getResend().emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "noreply@aumentia.ai",
        to: r.email,
        subject,
        html,
      });
      await serviceClient
        .from("respondents")
        .update({ status: "sent", sent_at: new Date().toISOString() })
        .eq("id", r.id);
    })
  );

  const failedEmails = emailResults.filter((r) => r.status === "rejected").length;

  return NextResponse.json({
    auditId: auditData.id,
    respondentCount: respondentData?.length ?? 0,
    failedEmails,
  });
}
