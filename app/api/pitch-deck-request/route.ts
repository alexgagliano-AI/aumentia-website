import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstname, lastname, email, company, ticket, message } = body;

    if (!firstname || !lastname || !email || !company || !ticket) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Aumentia <alexandre@aumentia.ai>",
      to: "alex@aumentia.ai",
      subject: `🤝 Demande pitch deck investisseur — ${firstname} ${lastname} (${company})`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head><meta charset="UTF-8" /></head>
        <body style="font-family: Arial, sans-serif; background: #0a0a0a; margin: 0; padding: 20px;">
          <div style="max-width: 560px; margin: 0 auto; background: #111; border-radius: 16px; overflow: hidden; border: 1px solid #1a1a1a;">
            <div style="background: #0a1628; padding: 28px 32px; border-bottom: 2px solid #00D4C8;">
              <div style="display: inline-block; background: #00D4C8; width: 40px; height: 40px; border-radius: 10px; line-height: 40px; text-align: center; font-weight: 900; color: #000; font-size: 18px; margin-bottom: 12px;">A</div>
              <h1 style="color: #fff; margin: 0; font-size: 20px; font-weight: 900;">Nouvelle demande — Pitch Deck Investisseur</h1>
              <p style="color: #9ca3af; margin: 6px 0 0; font-size: 13px;">aumentia.ai · Levée €1M–€2M</p>
            </div>
            <div style="padding: 28px 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #9ca3af; font-size: 13px; width: 130px;">Prénom</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #fff; font-size: 14px; font-weight: 600;">${firstname}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #9ca3af; font-size: 13px;">Nom</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #fff; font-size: 14px; font-weight: 600;">${lastname}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #9ca3af; font-size: 13px;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                    <a href="mailto:${email}" style="color: #00D4C8; font-size: 14px; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #9ca3af; font-size: 13px;">Société / Fonds</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #fff; font-size: 14px; font-weight: 600;">${company}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #9ca3af; font-size: 13px;">Ticket habituel</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #00D4C8; font-size: 14px; font-weight: 700;">${ticket}</td>
                </tr>
                ${message ? `
                <tr>
                  <td style="padding: 10px 0; color: #9ca3af; font-size: 13px; vertical-align: top; padding-top: 14px;">Message</td>
                  <td style="padding: 10px 0; color: #e5e7eb; font-size: 14px; line-height: 1.6;">${message}</td>
                </tr>
                ` : ""}
              </table>
              <div style="margin-top: 28px; text-align: center;">
                <a href="mailto:${email}?subject=Pitch Deck Aumentia — Suite à votre demande"
                   style="display: inline-block; background: #00D4C8; color: #000; font-weight: 900; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-size: 14px;">
                  Répondre à ${firstname} →
                </a>
              </div>
            </div>
            <div style="background: #0a0a0a; padding: 20px 32px; border-top: 1px solid #1a1a1a;">
              <p style="color: #4b5563; font-size: 12px; margin: 0; text-align: center;">
                Aumentia · <a href="https://aumentia.ai/fr/investors" style="color: #4b5563;">aumentia.ai/investors</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Pitch deck request error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
