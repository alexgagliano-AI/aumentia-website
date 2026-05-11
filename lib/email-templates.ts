import type { Lang } from "./i18n-diagnostic";
import { EMAIL_STRINGS } from "./i18n-diagnostic";

export function invitationEmail({
  name,
  companyName,
  roleLabel,
  link,
  senderName,
  lang = "fr",
}: {
  name: string;
  companyName: string;
  roleLabel: string;
  link: string;
  senderName: string;
  lang?: Lang;
}) {
  const s = EMAIL_STRINGS[lang];
  return {
    subject: s.inviteSubject(companyName),
    html: `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0E0E0E;border:1px solid #1A1A1A;border-radius:16px;overflow:hidden;max-width:100%;">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#050505 0%,#0a1a1a 100%);padding:40px;text-align:center;border-bottom:1px solid #1A1A1A;">
          <div style="font-size:28px;font-weight:900;color:#00D4C8;letter-spacing:-0.02em;">AUMENTIA</div>
          <div style="font-size:12px;color:#6B7280;letter-spacing:0.1em;text-transform:uppercase;margin-top:4px;">${lang === "it" ? "Diagnostico IA" : lang === "en" ? "AI Diagnostic" : "Diagnostic IA"}</div>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          <p style="font-size:20px;font-weight:700;color:#fff;margin:0 0 8px;">${s.inviteHello(name)}</p>
          <p style="color:#9CA3AF;font-size:15px;line-height:1.7;margin:0 0 24px;">
            ${s.inviteBody(companyName, roleLabel)}
          </p>
          <div style="background:#050505;border:1px solid #1A1A1A;border-radius:12px;padding:20px;margin:0 0 28px;">
            <div style="display:flex;gap:16px;margin-bottom:12px;">
              <span style="color:#00D4C8;font-size:18px;">⏱</span>
              <span style="color:#9CA3AF;font-size:14px;">${s.inviteTime}</span>
            </div>
            <div style="display:flex;gap:16px;margin-bottom:12px;">
              <span style="color:#00D4C8;font-size:18px;">🔒</span>
              <span style="color:#9CA3AF;font-size:14px;">${s.inviteConfidential}</span>
            </div>
            <div style="display:flex;gap:16px;">
              <span style="color:#00D4C8;font-size:18px;">🎯</span>
              <span style="color:#9CA3AF;font-size:14px;">${s.inviteImpact(companyName)}</span>
            </div>
          </div>
          <div style="text-align:center;margin:32px 0;">
            <a href="${link}" style="display:inline-block;background:#00D4C8;color:#050505;font-weight:700;font-size:16px;padding:16px 40px;border-radius:8px;text-decoration:none;letter-spacing:-0.01em;">
              ${s.inviteCta}
            </a>
          </div>
          <p style="color:#6B7280;font-size:13px;text-align:center;margin:0;">
            ${s.inviteLinkLabel}<br>
            <a href="${link}" style="color:#00D4C8;font-size:12px;">${link}</a>
          </p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 40px;border-top:1px solid #1A1A1A;text-align:center;">
          <p style="color:#6B7280;font-size:12px;margin:0;">
            ${s.inviteSentBy(senderName)}<br>
            <span style="color:#444;">${s.invitePersonalLink}</span>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };
}

export function reminderEmail({
  name,
  companyName,
  roleLabel,
  link,
  daysElapsed,
  lang = "fr",
}: {
  name: string;
  companyName: string;
  roleLabel: string;
  link: string;
  daysElapsed: number;
  lang?: Lang;
}) {
  const s = EMAIL_STRINGS[lang];
  return {
    subject: s.reminderSubject(companyName, daysElapsed),
    html: `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0E0E0E;border:1px solid #1A1A1A;border-radius:16px;overflow:hidden;max-width:100%;">
        <tr><td style="background:linear-gradient(135deg,#050505 0%,#0a1a1a 100%);padding:40px;text-align:center;border-bottom:1px solid #1A1A1A;">
          <div style="font-size:28px;font-weight:900;color:#C8922A;letter-spacing:-0.02em;">AUMENTIA</div>
          <div style="font-size:12px;color:#6B7280;letter-spacing:0.1em;text-transform:uppercase;margin-top:4px;">${lang === "it" ? "Promemoria — Diagnostico IA" : lang === "en" ? "Reminder — AI Diagnostic" : "Rappel — Diagnostic IA"}</div>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="font-size:20px;font-weight:700;color:#fff;margin:0 0 8px;">${s.reminderHello(name)}</p>
          <p style="color:#9CA3AF;font-size:15px;line-height:1.7;margin:0 0 24px;">
            ${s.reminderBody(companyName, roleLabel)}
          </p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${link}" style="display:inline-block;background:#C8922A;color:#050505;font-weight:700;font-size:16px;padding:16px 40px;border-radius:8px;text-decoration:none;">
              ${s.reminderCta}
            </a>
          </div>
          <p style="color:#6B7280;font-size:12px;text-align:center;margin:0;">
            <a href="${link}" style="color:#C8922A;">${link}</a>
          </p>
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid #1A1A1A;text-align:center;">
          <p style="color:#6B7280;font-size:12px;margin:0;">Aumentia — ${lang === "it" ? "Diagnostico IA Strategico" : lang === "en" ? "Strategic AI Diagnostic" : "Diagnostic IA Stratégique"}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };
}

export function completionNotificationEmail({
  auditTitle,
  companyName,
  completedCount,
  totalCount,
  auditUrl,
}: {
  auditTitle: string;
  companyName: string;
  completedCount: number;
  totalCount: number;
  auditUrl: string;
}) {
  const allDone = completedCount === totalCount;
  return {
    subject: allDone
      ? `✅ Diagnostic complet — ${companyName} (${completedCount}/${totalCount})`
      : `📊 Nouveau répondant — ${companyName} (${completedCount}/${totalCount})`,
    html: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0E0E0E;border:1px solid #1A1A1A;border-radius:16px;overflow:hidden;max-width:100%;">
        <tr><td style="padding:40px;text-align:center;">
          <div style="font-size:48px;margin-bottom:16px;">${allDone ? "🎉" : "📊"}</div>
          <h2 style="color:#fff;font-size:22px;font-weight:800;margin:0 0 8px;">
            ${allDone ? "Tous les répondants ont complété !" : "Nouveau répondant enregistré"}
          </h2>
          <p style="color:#9CA3AF;font-size:15px;margin:0 0 24px;">
            <strong style="color:#00D4C8;">${companyName}</strong> — ${auditTitle}<br>
            <span style="color:#fff;font-size:20px;font-weight:700;">${completedCount} / ${totalCount}</span> répondants
          </p>
          ${allDone ? `<p style="color:#9CA3AF;font-size:14px;margin:0 0 28px;">Le rapport peut maintenant être généré avec toutes les données.</p>` : ""}
          <a href="${auditUrl}" style="display:inline-block;background:#00D4C8;color:#050505;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">
            Voir le tableau de bord →
          </a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };
}

export function thankYouEmail({
  name,
  companyName,
  resultsLink,
  lang = "fr",
}: {
  name: string;
  companyName: string;
  resultsLink: string;
  lang?: Lang;
}) {
  const s = EMAIL_STRINGS[lang];
  return {
    subject: s.thankYouSubject(name),
    html: `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0E0E0E;border:1px solid #1A1A1A;border-radius:16px;overflow:hidden;max-width:100%;">
        <tr><td style="padding:40px;text-align:center;">
          <div style="font-size:48px;margin-bottom:16px;">✅</div>
          <h2 style="color:#fff;font-size:22px;font-weight:800;margin:0 0 8px;">${s.thankYouTitle(name)}</h2>
          <p style="color:#9CA3AF;font-size:15px;line-height:1.7;margin:0 0 24px;">
            ${s.thankYouBody(companyName)}
          </p>
          <a href="${resultsLink}" style="display:inline-block;background:#00D4C8;color:#050505;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">
            ${s.thankYouCta}
          </a>
          <p style="color:#6B7280;font-size:12px;margin:24px 0 0;">
            ${s.thankYouFooter(companyName)}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };
}
