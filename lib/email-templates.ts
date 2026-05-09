export function invitationEmail({
  name,
  companyName,
  roleLabel,
  link,
  senderName,
}: {
  name: string;
  companyName: string;
  roleLabel: string;
  link: string;
  senderName: string;
}) {
  return {
    subject: `Votre invitation — Diagnostic IA ${companyName}`,
    html: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0E0E0E;border:1px solid #1A1A1A;border-radius:16px;overflow:hidden;max-width:100%;">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#050505 0%,#0a1a1a 100%);padding:40px;text-align:center;border-bottom:1px solid #1A1A1A;">
          <div style="font-size:28px;font-weight:900;color:#00D4C8;letter-spacing:-0.02em;">AUMENTIA</div>
          <div style="font-size:12px;color:#6B7280;letter-spacing:0.1em;text-transform:uppercase;margin-top:4px;">Diagnostic IA</div>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          <p style="font-size:20px;font-weight:700;color:#fff;margin:0 0 8px;">Bonjour ${name},</p>
          <p style="color:#9CA3AF;font-size:15px;line-height:1.7;margin:0 0 24px;">
            Vous avez été invité(e) à participer au <strong style="color:#fff;">Diagnostic IA de ${companyName}</strong>.
            En tant que <strong style="color:#00D4C8;">${roleLabel}</strong>, votre perspective est essentielle pour produire une analyse précise et actionnable.
          </p>
          <div style="background:#050505;border:1px solid #1A1A1A;border-radius:12px;padding:20px;margin:0 0 28px;">
            <div style="display:flex;gap:16px;margin-bottom:12px;">
              <span style="color:#00D4C8;font-size:18px;">⏱</span>
              <span style="color:#9CA3AF;font-size:14px;"><strong style="color:#fff;">20 à 30 minutes</strong> — à compléter en une ou plusieurs fois</span>
            </div>
            <div style="display:flex;gap:16px;margin-bottom:12px;">
              <span style="color:#00D4C8;font-size:18px;">🔒</span>
              <span style="color:#9CA3AF;font-size:14px;"><strong style="color:#fff;">Confidentiel</strong> — vos réponses sont anonymisées dans le rapport</span>
            </div>
            <div style="display:flex;gap:16px;">
              <span style="color:#00D4C8;font-size:18px;">🎯</span>
              <span style="color:#9CA3AF;font-size:14px;"><strong style="color:#fff;">Impact direct</strong> — vos insights alimentent le plan IA de ${companyName}</span>
            </div>
          </div>
          <div style="text-align:center;margin:32px 0;">
            <a href="${link}" style="display:inline-block;background:#00D4C8;color:#050505;font-weight:700;font-size:16px;padding:16px 40px;border-radius:8px;text-decoration:none;letter-spacing:-0.01em;">
              Démarrer le diagnostic →
            </a>
          </div>
          <p style="color:#6B7280;font-size:13px;text-align:center;margin:0;">
            Ou copiez ce lien dans votre navigateur :<br>
            <a href="${link}" style="color:#00D4C8;font-size:12px;">${link}</a>
          </p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 40px;border-top:1px solid #1A1A1A;text-align:center;">
          <p style="color:#6B7280;font-size:12px;margin:0;">
            Envoyé par <strong style="color:#9CA3AF;">${senderName}</strong> via Aumentia<br>
            <span style="color:#444;">Ce lien est personnel et unique — ne le partagez pas.</span>
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
}: {
  name: string;
  companyName: string;
  roleLabel: string;
  link: string;
  daysElapsed: number;
}) {
  return {
    subject: `Rappel — Diagnostic IA ${companyName} (${daysElapsed} jours)`,
    html: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0E0E0E;border:1px solid #1A1A1A;border-radius:16px;overflow:hidden;max-width:100%;">
        <tr><td style="background:linear-gradient(135deg,#050505 0%,#0a1a1a 100%);padding:40px;text-align:center;border-bottom:1px solid #1A1A1A;">
          <div style="font-size:28px;font-weight:900;color:#C8922A;letter-spacing:-0.02em;">AUMENTIA</div>
          <div style="font-size:12px;color:#6B7280;letter-spacing:0.1em;text-transform:uppercase;margin-top:4px;">Rappel — Diagnostic IA</div>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="font-size:20px;font-weight:700;color:#fff;margin:0 0 8px;">Bonjour ${name},</p>
          <p style="color:#9CA3AF;font-size:15px;line-height:1.7;margin:0 0 24px;">
            Votre questionnaire pour le <strong style="color:#fff;">Diagnostic IA de ${companyName}</strong> est toujours en attente.
            Il ne reste que quelques minutes — votre avis en tant que <strong style="color:#C8922A;">${roleLabel}</strong> est précieux.
          </p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${link}" style="display:inline-block;background:#C8922A;color:#050505;font-weight:700;font-size:16px;padding:16px 40px;border-radius:8px;text-decoration:none;">
              Compléter maintenant (20 min) →
            </a>
          </div>
          <p style="color:#6B7280;font-size:12px;text-align:center;margin:0;">
            <a href="${link}" style="color:#C8922A;">${link}</a>
          </p>
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid #1A1A1A;text-align:center;">
          <p style="color:#6B7280;font-size:12px;margin:0;">Aumentia — Diagnostic IA Stratégique</p>
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
}: {
  name: string;
  companyName: string;
  resultsLink: string;
}) {
  return {
    subject: `Merci ${name} — Vos résultats du Diagnostic IA`,
    html: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0E0E0E;border:1px solid #1A1A1A;border-radius:16px;overflow:hidden;max-width:100%;">
        <tr><td style="padding:40px;text-align:center;">
          <div style="font-size:48px;margin-bottom:16px;">✅</div>
          <h2 style="color:#fff;font-size:22px;font-weight:800;margin:0 0 8px;">Merci ${name} !</h2>
          <p style="color:#9CA3AF;font-size:15px;line-height:1.7;margin:0 0 24px;">
            Votre contribution au <strong style="color:#fff;">Diagnostic IA de ${companyName}</strong> a bien été enregistrée.
            Consultez votre tableau de bord personnalisé ci-dessous.
          </p>
          <a href="${resultsLink}" style="display:inline-block;background:#00D4C8;color:#050505;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">
            Voir mes résultats →
          </a>
          <p style="color:#6B7280;font-size:12px;margin:24px 0 0;">
            Le rapport complet sera partagé avec la direction de ${companyName} par Alexandre de l'équipe Aumentia.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };
}
