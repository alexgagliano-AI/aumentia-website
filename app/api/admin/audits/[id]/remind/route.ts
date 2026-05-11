import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { reminderEmail } from "@/lib/email-templates";
import { ROLE_LABELS_I18N, type Lang } from "@/lib/i18n-diagnostic";
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

  const { respondentId, all } = await req.json();
  const serviceClient = createServiceClient();

  const { data: audit } = await serviceClient
    .from("audits")
    .select("title, language, companies (name)")
    .eq("id", id)
    .single();

  const companyName = (audit?.companies as unknown as { name: string } | null)?.name ?? "";
  const lang: Lang = ((audit as { language?: string } | null)?.language as Lang) ?? "fr";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://aumentia.ai";

  // Fetch respondents to remind
  let respondents: { id: string; name: string; email: string; role: Role; token: string; sent_at: string | null; reminder_count: number }[] = [];

  if (all) {
    const { data } = await serviceClient
      .from("respondents")
      .select("*")
      .eq("audit_id", id)
      .neq("status", "completed");
    respondents = data ?? [];
  } else if (respondentId) {
    const { data } = await serviceClient
      .from("respondents")
      .select("*")
      .eq("id", respondentId)
      .single();
    if (data) respondents = [data];
  }

  let sent = 0;
  for (const r of respondents) {
    const sentAt = r.sent_at ? new Date(r.sent_at) : new Date();
    const daysElapsed = Math.floor((Date.now() - sentAt.getTime()) / (1000 * 60 * 60 * 24));
    const link = `${appUrl}/respond/${r.token}`;

    const roleLabel = ROLE_LABELS_I18N[lang][r.role] ?? ROLE_LABELS[r.role];
    const { subject, html } = reminderEmail({
      name: r.name,
      companyName,
      roleLabel,
      link,
      daysElapsed: Math.max(daysElapsed, 1),
      lang,
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
        .update({
          reminder_count: (r.reminder_count ?? 0) + 1,
          last_reminder_at: new Date().toISOString(),
        })
        .eq("id", r.id);
      sent++;
    } catch { /* continue */ }
  }

  return NextResponse.json({ sent });
}
