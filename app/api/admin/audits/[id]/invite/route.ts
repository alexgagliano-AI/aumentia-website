import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { invitationEmail } from "@/lib/email-templates";
import { ROLE_LABELS } from "@/lib/questions";
import type { Role } from "@/lib/questions";

function getResend() { return new Resend(process.env.RESEND_API_KEY); }

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const serviceClient = createServiceClient();
  const { respondentIds } = await req.json(); // optional: specific respondents

  const query = serviceClient
    .from("respondents")
    .select("*")
    .eq("audit_id", id)
    .eq("status", "pending");

  const { data: respondents } = await (respondentIds
    ? query.in("id", respondentIds)
    : query);

  const { data: audit } = await serviceClient
    .from("audits")
    .select("title, companies (name)")
    .eq("id", id)
    .single();

  const companyName = (audit?.companies as unknown as { name: string } | null)?.name ?? "";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://aumentia.ai";
  const senderName = user.email?.split("@")[0] ?? "Alexandre";

  let sent = 0;
  for (const r of respondents ?? []) {
    const link = `${appUrl}/respond/${r.token}`;
    const { subject, html } = invitationEmail({
      name: r.name,
      companyName,
      roleLabel: ROLE_LABELS[r.role as Role],
      link,
      senderName,
    });
    try {
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
      sent++;
    } catch { /* continue */ }
  }

  return NextResponse.json({ sent });
}
