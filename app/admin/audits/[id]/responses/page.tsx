import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import { QUESTIONS, ROLE_LABELS, SECTIONS } from "@/lib/questions";
import type { Role } from "@/lib/questions";

export default async function AuditResponses({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: audit } = await supabase
    .from("audits")
    .select("*, companies (*)")
    .eq("id", id)
    .single();

  if (!audit) notFound();

  const company = audit.companies as { name: string } | null;

  const { data: respondents } = await supabase
    .from("respondents")
    .select("id, name, role, status, completed_at")
    .eq("audit_id", id)
    .eq("status", "completed")
    .order("completed_at", { ascending: true });

  const { data: allResponses } = await supabase
    .from("responses")
    .select("respondent_id, question_id, answer, score")
    .eq("audit_id", id);

  // Index responses by respondent
  const responsesByRespondent: Record<string, Record<string, { answer: string | null; score: number | null }>> = {};
  for (const r of allResponses ?? []) {
    if (!responsesByRespondent[r.respondent_id]) responsesByRespondent[r.respondent_id] = {};
    responsesByRespondent[r.respondent_id][r.question_id] = { answer: r.answer, score: r.score };
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)" }}>
      <AdminNav user={user} />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <Link href={`/admin/audits/${id}`} style={{ color: "var(--gray)", fontSize: 13, textDecoration: "none" }}>
            ← {company?.name}
          </Link>
          <span style={{ color: "var(--dark-border)" }}>/</span>
          <span style={{ fontSize: 13, color: "var(--gray-light)" }}>Réponses détaillées</span>
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>Réponses détaillées</h1>
        <p style={{ color: "var(--gray-light)", fontSize: 13, marginBottom: 32 }}>
          {respondents?.length ?? 0} répondant{(respondents?.length ?? 0) > 1 ? "s" : ""} complété{(respondents?.length ?? 0) > 1 ? "s" : ""}
        </p>

        {(respondents ?? []).map((respondent) => {
          const myResponses = responsesByRespondent[respondent.id] ?? {};
          const myQuestions = QUESTIONS.filter(
            (q) => q.roles === "all" || (q.roles as Role[]).includes(respondent.role as Role)
          );

          return (
            <div key={respondent.id} style={{ marginBottom: 32 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 20px", background: "var(--dark-card)",
                borderRadius: "12px 12px 0 0", border: "1px solid var(--dark-border)",
                borderBottom: "none",
              }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{respondent.name}</span>
                  <span style={{ color: "var(--cyan)", fontSize: 12, marginLeft: 10 }}>
                    {ROLE_LABELS[respondent.role as Role]}
                  </span>
                </div>
                {respondent.completed_at && (
                  <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--gray)" }}>
                    Complété le {new Date(respondent.completed_at).toLocaleDateString("fr-BE")}
                  </span>
                )}
              </div>

              <div style={{
                background: "var(--dark-card)", border: "1px solid var(--dark-border)",
                borderRadius: "0 0 12px 12px", overflow: "hidden",
              }}>
                {SECTIONS.map((section) => {
                  const sectionQuestions = myQuestions.filter((q) => q.section === section.id);
                  if (sectionQuestions.length === 0) return null;
                  const hasAnswers = sectionQuestions.some((q) => myResponses[q.id]);
                  if (!hasAnswers) return null;

                  return (
                    <div key={section.id}>
                      <div style={{
                        padding: "10px 20px", background: "rgba(0,212,200,0.05)",
                        borderBottom: "1px solid var(--dark-border)",
                        fontSize: 11, fontWeight: 700, color: "var(--cyan)",
                        textTransform: "uppercase", letterSpacing: "0.08em",
                      }}>
                        {section.label}
                      </div>
                      {sectionQuestions.map((q) => {
                        const resp = myResponses[q.id];
                        if (!resp) return null;

                        return (
                          <div key={q.id} style={{
                            padding: "14px 20px",
                            borderBottom: "1px solid var(--dark-border)",
                          }}>
                            <p style={{ fontSize: 12, color: "var(--gray-light)", marginBottom: 6 }}>
                              {q.text}
                            </p>
                            {resp.score !== null ? (
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{
                                  fontSize: 20, fontWeight: 900,
                                  color: resp.score >= 4 ? "#10B981" : resp.score >= 3 ? "var(--gold)" : "#EF4444",
                                }}>
                                  {resp.score}
                                </span>
                                <span style={{ fontSize: 12, color: "var(--gray)" }}>/5</span>
                                <div style={{ flex: 1, height: 4, background: "var(--dark-border)", borderRadius: 2, maxWidth: 120 }}>
                                  <div style={{
                                    height: "100%", borderRadius: 2,
                                    width: `${(resp.score / 5) * 100}%`,
                                    background: resp.score >= 4 ? "#10B981" : resp.score >= 3 ? "var(--gold)" : "#EF4444",
                                  }} />
                                </div>
                                {q.options?.find((o) => o.value === String(resp.score)) && (
                                  <span style={{ fontSize: 12, color: "var(--gray-light)" }}>
                                    — {q.options.find((o) => o.value === String(resp.score))?.label}
                                  </span>
                                )}
                              </div>
                            ) : resp.answer ? (
                              <p style={{ fontSize: 14, color: "#fff", lineHeight: 1.6, margin: 0 }}>
                                {resp.answer}
                              </p>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {(respondents ?? []).length === 0 && (
          <div className="card" style={{ padding: 40, textAlign: "center" }}>
            <p style={{ color: "var(--gray-light)" }}>Aucun répondant n&apos;a encore complété le questionnaire.</p>
          </div>
        )}
      </main>
    </div>
  );
}
