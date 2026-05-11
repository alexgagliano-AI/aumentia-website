import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { thankYouEmail, completionNotificationEmail } from "@/lib/email-templates";
import { ROLE_LABELS_I18N, type Lang } from "@/lib/i18n-diagnostic";
import { ROLE_LABELS } from "@/lib/questions";
import type { Role } from "@/lib/questions";

function getResend() { return new Resend(process.env.RESEND_API_KEY); }

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const supabase = createServiceClient();

  const { data: respondent } = await supabase
    .from("respondents")
    .select("id, name, role, status, audit_id")
    .eq("token", token)
    .single();

  if (!respondent) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data: existing } = await supabase
    .from("responses")
    .select("question_id, answer, score")
    .eq("respondent_id", respondent.id);

  return NextResponse.json({ respondent, existingResponses: existing ?? [] });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const supabase = createServiceClient();

  const { respondentId, answers, partial } = await req.json();

  const { data: respondent } = await supabase
    .from("respondents")
    .select("*, audits (id, title, language, created_by, companies (name))")
    .eq("token", token)
    .eq("id", respondentId)
    .single();

  if (!respondent) return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  if (respondent.status === "completed") {
    return NextResponse.json({ error: "Already submitted" }, { status: 409 });
  }

  if (answers && answers.length > 0) {
    const upsertData = answers.map((a: { question_id: string; answer: string | null; score: number | null }) => ({
      respondent_id: respondentId,
      audit_id: respondent.audit_id,
      question_id: a.question_id,
      answer: a.answer,
      score: a.score,
    }));

    const { error } = await supabase
      .from("responses")
      .upsert(upsertData, { onConflict: "respondent_id,question_id" });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!partial) {
    await supabase
      .from("respondents")
      .update({ status: "completed", completed_at: new Date().toISOString() })
      .eq("id", respondentId);

    const audit = respondent.audits as {
      id: string; title: string; language?: string; created_by: string | null;
      companies: { name: string } | null;
    } | null;

    const lang: Lang = (audit?.language as Lang) ?? "fr";
    const companyName = audit?.companies?.name ?? "l'entreprise";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://aumentia.ai";

    try {
      const { subject, html } = thankYouEmail({
        name: respondent.name,
        companyName,
        resultsLink: `${appUrl}/results/${token}`,
        lang,
      });
      await getResend().emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "noreply@aumentia.ai",
        to: respondent.email,
        subject,
        html,
      });
    } catch { /* non-blocking */ }

    if (audit?.id) {
      const { data: allRespondents } = await supabase
        .from("respondents")
        .select("status")
        .eq("audit_id", audit.id);

      const completedCount = allRespondents?.filter((r) => r.status === "completed").length ?? 0;
      const totalCount = allRespondents?.length ?? 0;

      if (audit.created_by) {
        const { data: adminUser } = await supabase.auth.admin.getUserById(audit.created_by);
        const adminEmail = adminUser?.user?.email;

        if (adminEmail) {
          try {
            const { subject, html } = completionNotificationEmail({
              auditTitle: audit.title,
              companyName,
              completedCount,
              totalCount,
              auditUrl: `${appUrl}/admin/audits/${audit.id}`,
            });
            await getResend().emails.send({
              from: process.env.RESEND_FROM_EMAIL ?? "noreply@aumentia.ai",
              to: adminEmail,
              subject,
              html,
            });
          } catch { /* non-blocking */ }
        }
      }
    }
  }

  return NextResponse.json({ success: true });
}
