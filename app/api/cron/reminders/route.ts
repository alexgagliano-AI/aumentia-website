import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { reminderEmail } from "@/lib/email-templates";
import { ROLE_LABELS } from "@/lib/questions";
import type { Role } from "@/lib/questions";

function getResend() { return new Resend(process.env.RESEND_API_KEY); }

// Called by Vercel cron daily — sends reminders at day 3 and day 7
export async function GET(req: NextRequest) {
  // Verify cron secret
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const now = new Date();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://aumentia.ai";

  // Fetch all non-completed respondents with their audit info
  const { data: respondents } = await supabase
    .from("respondents")
    .select("*, audits (title, companies (name))")
    .neq("status", "completed");

  if (!respondents || respondents.length === 0) {
    return NextResponse.json({ sent: 0, message: "No pending respondents" });
  }

  let sent = 0;
  const REMINDER_DAYS = [3, 7]; // send at day 3 and day 7

  for (const r of respondents) {
    const sentAt = r.sent_at ? new Date(r.sent_at) : null;
    if (!sentAt) continue;

    const daysElapsed = Math.floor((now.getTime() - sentAt.getTime()) / (1000 * 60 * 60 * 24));
    const reminders = r.reminder_count ?? 0;

    // Check if a reminder should be sent at this day threshold
    const shouldSend = REMINDER_DAYS.some((d) => daysElapsed >= d && reminders < REMINDER_DAYS.indexOf(d) + 1);
    if (!shouldSend) continue;

    // Check last reminder wasn't sent today
    if (r.last_reminder_at) {
      const lastReminder = new Date(r.last_reminder_at);
      const hoursSinceLast = (now.getTime() - lastReminder.getTime()) / (1000 * 60 * 60);
      if (hoursSinceLast < 20) continue;
    }

    const audit = r.audits as { title: string; companies: { name: string } | null } | null;
    const companyName = audit?.companies?.name ?? "l'entreprise";
    const link = `${appUrl}/respond/${r.token}`;

    const { subject, html } = reminderEmail({
      name: r.name,
      companyName,
      roleLabel: ROLE_LABELS[r.role as Role],
      link,
      daysElapsed,
    });

    try {
      await getResend().emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "noreply@aumentia.ai",
        to: r.email,
        subject,
        html,
      });
      await supabase
        .from("respondents")
        .update({
          reminder_count: reminders + 1,
          last_reminder_at: now.toISOString(),
        })
        .eq("id", r.id);
      sent++;
    } catch { /* continue to next respondent */ }
  }

  return NextResponse.json({ sent, checked: respondents.length });
}
