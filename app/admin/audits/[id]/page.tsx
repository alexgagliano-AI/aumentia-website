import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import AuditActions from "@/components/AuditActions";
import ReportViewer from "@/components/ReportViewer";
import RemindButtonClient from "@/components/RemindButtonClient";
import { ROLE_LABELS } from "@/lib/questions";
import { calculateScores, PILLAR_LABELS } from "@/lib/scoring";
import type { Role } from "@/lib/questions";
import type { Pillar } from "@/lib/scoring";

export default async function AuditDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: audit } = await supabase
    .from("audits")
    .select(`*, companies (*), respondents (*)`)
    .eq("id", id)
    .single();

  if (!audit) notFound();

  const respondents = (audit.respondents ?? []) as {
    id: string; name: string; email: string; role: Role;
    status: string; sent_at: string | null; completed_at: string | null;
    reminder_count: number; last_reminder_at: string | null; token: string;
  }[];

  const company = audit.companies as { name: string; industry?: string; size?: string; country?: string } | null;

  const completed = respondents.filter((r) => r.status === "completed");
  const pct = respondents.length > 0 ? Math.round((completed.length / respondents.length) * 100) : 0;

  const { data: allResponses } = await supabase
    .from("responses")
    .select("question_id, answer, score")
    .eq("audit_id", id);

  const scores = calculateScores(allResponses ?? []);

  const statusColors: Record<string, string> = {
    pending: "var(--gray)", sent: "var(--gold)", completed: "#10B981",
  };
  const statusLabels: Record<string, string> = {
    pending: "Non envoyé", sent: "En attente", completed: "Complété",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)" }}>
      <AdminNav user={user} />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32, gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Link href="/admin/dashboard" style={{ color: "var(--gray)", fontSize: 13, textDecoration: "none" }}>← Diagnostics</Link>
              <span style={{ color: "var(--dark-border)" }}>/</span>
              <span style={{ fontSize: 13, color: "var(--gray-light)" }}>{company?.name}</span>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 4 }}>
              {company?.name}
            </h1>
            <p style={{ color: "var(--gray-light)", fontSize: 13 }}>
              {audit.title}
              {company?.industry && ` · ${company.industry}`}
              {company?.size && ` · ${company.size} employés`}
              {company?.country && ` · ${company.country}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {completed.length > 0 && (
              <Link
                href={`/admin/audits/${id}/responses`}
                style={{
                  padding: "9px 18px", background: "transparent",
                  border: "1px solid var(--dark-border)", borderRadius: 8,
                  color: "var(--gray-light)", fontSize: 13, textDecoration: "none",
                }}
              >
                📋 Voir les réponses
              </Link>
            )}
            <AuditActions
              auditId={id}
              status={audit.status}
              respondentCount={respondents.length}
              completedCount={completed.length}
              hasReport={!!audit.report_content}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Left: progress + respondents */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--gray-light)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Progression
                </span>
                <span style={{ fontSize: 24, fontWeight: 900, color: pct === 100 ? "#10B981" : "var(--cyan)" }}>
                  {pct}%
                </span>
              </div>
              <div style={{ height: 6, background: "var(--dark-border)", borderRadius: 3, marginBottom: 8 }}>
                <div style={{
                  height: "100%", borderRadius: 3, transition: "width 0.5s",
                  width: `${pct}%`, background: pct === 100 ? "#10B981" : "var(--cyan)",
                }} />
              </div>
              <p style={{ color: "var(--gray-light)", fontSize: 13, margin: 0 }}>
                <strong style={{ color: "#fff" }}>{completed.length}</strong> / <strong style={{ color: "#fff" }}>{respondents.length}</strong> répondants complétés
              </p>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gray-light)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
                Répondants
              </p>
              {respondents.map((r, i) => (
                <div key={r.id} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
                  borderBottom: i < respondents.length - 1 ? "1px solid var(--dark-border)" : "none",
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: "var(--gray-light)" }}>
                      {ROLE_LABELS[r.role]} · {r.email}
                    </div>
                    {r.reminder_count > 0 && (
                      <div style={{ fontSize: 11, color: "var(--gold)", marginTop: 2 }}>
                        {r.reminder_count} rappel{r.reminder_count > 1 ? "s" : ""} envoyé{r.reminder_count > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 100,
                      border: `1px solid ${statusColors[r.status]}`,
                      color: statusColors[r.status], background: `${statusColors[r.status]}20`,
                    }}>
                      {statusLabels[r.status]}
                    </span>
                    {r.status !== "completed" && (
                      <RemindButtonClient respondentId={r.id} auditId={id} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: scores + notes */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {scores.overall > 0 && (
              <div className="card" style={{ padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gray-light)", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
                    Scores Préliminaires
                  </p>
                  <div>
                    <span style={{ fontSize: 24, fontWeight: 900, color: "var(--cyan)" }}>{scores.overall}</span>
                    <span style={{ fontSize: 12, color: "var(--gray-light)" }}>/100</span>
                  </div>
                </div>
                {scores.pillars.filter((p) => p.dataPoints > 0).map((p) => (
                  <div key={p.pillar} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: "var(--gray-light)" }}>{PILLAR_LABELS[p.pillar as Pillar]}</span>
                      <span style={{ fontSize: 12, fontWeight: 700 }}>{p.score}/100</span>
                    </div>
                    <div style={{ height: 4, background: "var(--dark-border)", borderRadius: 2 }}>
                      <div style={{
                        height: "100%", borderRadius: 2, width: `${p.score}%`,
                        background: p.score >= 65 ? "#10B981" : p.score >= 45 ? "var(--gold)" : "#EF4444",
                      }} />
                    </div>
                  </div>
                ))}
                <p style={{ fontSize: 11, color: "var(--gray)", margin: "8px 0 0" }}>
                  Score IA: {scores.aiReadiness}/100 · Basé sur {completed.length} répondant{completed.length > 1 ? "s" : ""}
                </p>
              </div>
            )}

            <div className="card" style={{ padding: 24 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gray-light)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                Notes internes
              </p>
              <p style={{ color: "var(--gray-light)", fontSize: 13, margin: 0 }}>
                {audit.notes ?? "Aucune note pour ce diagnostic."}
              </p>
            </div>
          </div>
        </div>

        {audit.report_content && (
          <div style={{ marginTop: 32 }}>
            <ReportViewer
              content={audit.report_content}
              companyName={company?.name ?? ""}
              generatedAt={audit.report_generated_at}
            />
          </div>
        )}
      </main>
    </div>
  );
}
