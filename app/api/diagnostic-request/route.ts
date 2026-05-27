import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ROLE_LABELS: Record<string, string> = {
  ceo: "CEO / Directeur Général",
  coo: "COO / Directeur Opérations",
  cfo: "CFO / Directeur Financier",
  other: "Autre dirigeant",
};

const EMPLOYEE_LABELS: Record<string, string> = {
  "1-10": "1–10 collaborateurs",
  "11-30": "11–30 collaborateurs",
  "31-100": "31–100 collaborateurs",
  "100+": "100+ collaborateurs",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, role, employees } = body;

    if (!name || !email || !company || !role) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // 1. Save lead to Supabase
    const supabase = createServiceClient();
    await supabase.from("leads").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      employees: employees || null,
      message: `Rôle : ${ROLE_LABELS[role] || role}`,
      source: "diagnostic_request",
    });

    // 2. Notify Alexandre
    const roleLabel = ROLE_LABELS[role] || role;
    const employeeLabel = employees ? (EMPLOYEE_LABELS[employees] || employees) : "Non renseigné";

    await resend.emails.send({
      from: "Aumentia <alexandre@aumentia.ai>",
      to: "alex@aumentia.ai",
      subject: `🔬 Nouvelle demande de diagnostic — ${name} (${company})`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head><meta charset="UTF-8" /></head>
        <body style="font-family: Arial, sans-serif; background: #0a0a0a; margin: 0; padding: 20px;">
          <div style="max-width: 560px; margin: 0 auto; background: #111; border-radius: 16px; overflow: hidden; border: 1px solid #1a1a1a;">

            <!-- Header -->
            <div style="background: #0F2A4A; padding: 28px 32px;">
              <div style="display: inline-block; background: #00D4C8; width: 40px; height: 40px; border-radius: 10px; line-height: 40px; text-align: center; font-weight: 900; color: #000; font-size: 18px; margin-bottom: 12px;">A</div>
              <h1 style="color: #fff; margin: 0; font-size: 20px; font-weight: 900;">Nouvelle demande de diagnostic</h1>
              <p style="color: #9ca3af; margin: 6px 0 0; font-size: 13px;">aumentia.ai · à traiter dans les 24h</p>
            </div>

            <!-- Body -->
            <div style="padding: 28px 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #9ca3af; font-size: 13px; width: 130px;">Nom</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #fff; font-size: 14px; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #9ca3af; font-size: 13px;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                    <a href="mailto:${email}" style="color: #00D4C8; font-size: 14px; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #9ca3af; font-size: 13px;">Entreprise</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #fff; font-size: 14px; font-weight: 600;">${company}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #9ca3af; font-size: 13px;">Rôle</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #C8922A; font-size: 14px; font-weight: 600;">${roleLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #9ca3af; font-size: 13px;">Taille</td>
                  <td style="padding: 10px 0; color: #fff; font-size: 14px;">${employeeLabel}</td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="margin-top: 28px; text-align: center;">
                <a href="https://aumentia.ai/admin/audits/new"
                   style="display: inline-block; background: #00D4C8; color: #000; font-weight: 900; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-size: 14px;">
                  Créer le diagnostic → /admin
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #0a0a0a; padding: 20px 32px; border-top: 1px solid #1a1a1a;">
              <p style="color: #4b5563; font-size: 12px; margin: 0; text-align: center;">
                Augmentia · <a href="https://aumentia.ai" style="color: #4b5563;">aumentia.ai</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Diagnostic request error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
