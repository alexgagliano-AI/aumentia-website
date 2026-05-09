import { createServiceClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import QuestionnaireClient from "@/components/QuestionnaireClient";
import { getQuestionsForRole, ROLE_LABELS } from "@/lib/questions";
import type { Role } from "@/lib/questions";

export default async function RespondPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const supabase = createServiceClient();

  const { data: respondent } = await supabase
    .from("respondents")
    .select("*, audits (title, companies (name))")
    .eq("token", token)
    .single();

  if (!respondent) notFound();

  if (respondent.status === "completed") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--dark)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 12 }}>Déjà complété !</h1>
          <p style={{ color: "var(--gray-light)", fontSize: 16, lineHeight: 1.7 }}>
            Vous avez déjà répondu à ce questionnaire. Merci pour votre contribution.
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
            Voir mes résultats →
          </a>
        </div>
      </div>
    );
  }

  const audit = respondent.audits as { title: string; companies: { name: string } | null } | null;
  const company = audit?.companies;
  const questions = getQuestionsForRole(respondent.role as Role);

  // Fetch any existing partial responses
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
      respondentRole={respondent.role as Role}
      roleLabel={ROLE_LABELS[respondent.role as Role]}
      companyName={company?.name ?? "votre entreprise"}
      questions={questions}
      savedAnswers={savedAnswers}
    />
  );
}
