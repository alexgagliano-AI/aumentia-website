import { createServiceClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import QuestionnaireClient from "@/components/QuestionnaireClient";
import { getQuestionsI18n, ROLE_LABELS } from "@/lib/questions";
import { ROLE_LABELS_I18N, UI, type Lang } from "@/lib/i18n-diagnostic";
import type { Role } from "@/lib/questions";

export default async function RespondPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const supabase = createServiceClient();

  const { data: respondent } = await supabase
    .from("respondents")
    .select("*, audits (title, language, companies (name))")
    .eq("token", token)
    .single();

  if (!respondent) notFound();

  const audit = respondent.audits as { title: string; language?: string; companies: { name: string } | null } | null;
  const lang: Lang = (audit?.language as Lang) ?? "fr";
  const ui = UI[lang];

  if (respondent.status === "completed") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--dark)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 12 }}>{ui.alreadyDone}</h1>
          <p style={{ color: "var(--gray-light)", fontSize: 16, lineHeight: 1.7 }}>
            {ui.alreadyDoneText}
          </p>
          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}/results/${token}`}
            style={{
              display: "inline-block", marginTop: 24,
              padding: "12px 28px", background: "var(--cyan)",
              color: "var(--dark)", borderRadius: 8, fontWeight: 700,
              fontSize: 14, textDecoration: "none",
            }}
          >
            {ui.seeResults}
          </a>
        </div>
      </div>
    );
  }

  const company = audit?.companies;
  const role = respondent.role as Role;
  const questions = getQuestionsI18n(role, lang);
  const roleLabel = ROLE_LABELS_I18N[lang][role] ?? ROLE_LABELS[role];

  const { data: existingResponses } = await supabase
    .from("responses")
    .select("question_id, answer, score")
    .eq("respondent_id", respondent.id);

  const savedAnswers: Record<string, string> = {};
  for (const r of existingResponses ?? []) {
    savedAnswers[r.question_id] = r.answer ?? String(r.score ?? "");
  }

  return (
    <QuestionnaireClient
      token={token}
      respondentId={respondent.id}
      respondentName={respondent.name}
      respondentRole={role}
      roleLabel={roleLabel}
      companyName={company?.name ?? (lang === "en" ? "your company" : lang === "it" ? "la tua azienda" : "votre entreprise")}
      questions={questions}
      savedAnswers={savedAnswers}
      lang={lang}
    />
  );
}
