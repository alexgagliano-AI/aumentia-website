import { createServiceClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { calculateScores, getMaturityLevel, BENCHMARKS, PILLAR_LABELS } from "@/lib/scoring";
import { ROLE_LABELS } from "@/lib/questions";
import { UI, ROLE_LABELS_I18N, type Lang } from "@/lib/i18n-diagnostic";
import type { Role } from "@/lib/questions";
import type { Pillar } from "@/lib/scoring";

export default async function ResultsPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const supabase = createServiceClient();

  const { data: respondent } = await supabase
    .from("respondents")
    .select("*, audits (id, title, language, companies (name, country, region))")
    .eq("token", token)
    .single();

  if (!respondent || respondent.status !== "completed") notFound();

  const audit = respondent.audits as { id: string; title: string; language?: string; companies: { name: string; country?: string; region?: string } | null } | null;
  const company = audit?.companies;
  const lang: Lang = (audit?.language as Lang) ?? "fr";
  const ui = UI[lang];
  const isCEO = respondent.role === "ceo";

  const { data: myResponses } = await supabase
    .from("responses")
    .select("question_id, answer, score")
    .eq("respondent_id", respondent.id);

  const myScores = calculateScores(myResponses ?? []);

  let auditScores = myScores;
  let completedCount = 1;
  let totalCount = 1;

  if (isCEO && audit) {
    const { data: allResponses } = await supabase
      .from("responses")
      .select("question_id, answer, score")
      .eq("audit_id", audit.id);

    const { data: allRespondents } = await supabase
      .from("respondents")
      .select("status")
      .eq("audit_id", audit.id);

    auditScores = calculateScores(allResponses ?? []);
    completedCount = allRespondents?.filter((r) => r.status === "completed").length ?? 1;
    totalCount = allRespondents?.length ?? 1;
  }

  const maturity = getMaturityLevel(isCEO ? auditScores.overall : myScores.overall);
  const countryLabel = company?.country ?? "Belgique";
  const regionLabel = company?.region ?? countryLabel;
  const roleLabel = ROLE_LABELS_I18N[lang][respondent.role] ?? ROLE_LABELS[respondent.role as Role];

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)" }}>
      <div style={{ background: "var(--dark-card)", borderBottom: "1px solid var(--dark-border)", padding: "16px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
          <Image src="/logo.png" alt="Aumentia" width={32} height={32} style={{ objectFit: "contain" }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--cyan)" }}>AUMENTIA</div>
            <div style={{ fontSize: 11, color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{ui.badge}</div>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 8 }}>
            {ui.thankYouTitle} {respondent.name} !
          </h1>
          <p style={{ color: "var(--gray-light)", fontSize: 16, lineHeight: 1.7 }}>
            {ui.thankYouSub} <strong style={{ color: "#fff" }}>{company?.name}</strong>{" "}
            {lang === "it" ? "è stata registrata." : lang === "en" ? "has been recorded." : "a bien été enregistrée."}
            {isCEO
              ? (lang === "en" ? " Here is your preliminary overview." : lang === "it" ? " Ecco la tua panoramica preliminare." : " Voici votre aperçu préliminaire.")
              : (lang === "en" ? " Here is your personal dashboard." : lang === "it" ? " Ecco la tua dashboard personale." : " Voici votre tableau de bord personnel.")}
          </p>
        </div>

        <div className="card" style={{ padding: 28, marginBottom: 24, textAlign: "center" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gray-light)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
            {isCEO ? ui.ceoMaturityLabel : `${ui.myScoreLabel} ${roleLabel}`}
          </p>
          {(isCEO ? auditScores.overall : myScores.overall) > 0 ? (
            <>
              <div style={{ fontSize: 56, fontWeight: 900, color: maturity.color, letterSpacing: "-0.03em", marginBottom: 4 }}>
                {isCEO ? auditScores.overall : myScores.overall}
                <span style={{ fontSize: 24, fontWeight: 400, color: "var(--gray)" }}>/100</span>
              </div>
              <div style={{ display: "inline-block", padding: "4px 16px", background: `${maturity.color}20`, border: `1px solid ${maturity.color}`, borderRadius: 100, color: maturity.color, fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
                {maturity.level}
              </div>
              <p style={{ color: "var(--gray-light)", fontSize: 14, margin: 0 }}>{maturity.description}</p>
            </>
          ) : (
            <p style={{ color: "var(--gray-light)", fontSize: 15, margin: 0 }}>
              {ui.noScoreYet}
            </p>
          )}
        </div>

        {(isCEO ? auditScores : myScores).pillars.filter((p) => p.dataPoints > 0).length > 0 && (
          <div className="card" style={{ padding: 28, marginBottom: 24 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gray-light)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
              {ui.scoresVsBenchmark} {regionLabel}
            </p>
            {(isCEO ? auditScores : myScores).pillars
              .filter((p) => p.dataPoints > 0)
              .map((p) => {
                const benchmark = BENCHMARKS[p.pillar as Pillar];
                const diff = p.score - benchmark;
                return (
                  <div key={p.pillar} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{PILLAR_LABELS[p.pillar as Pillar]}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 13, color: "var(--gray-light)" }}>
                          {ui.avg} {benchmark}
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 700 }}>{p.score}</span>
                        <span style={{ fontSize: 12, color: diff >= 0 ? "#10B981" : "#EF4444" }}>
                          {diff >= 0 ? "+" : ""}{diff}
                        </span>
                      </div>
                    </div>
                    <div style={{ position: "relative", height: 6, background: "var(--dark-border)", borderRadius: 3 }}>
                      <div style={{
                        position: "absolute", left: 0, top: 0, height: "100%", borderRadius: 3,
                        width: `${p.score}%`,
                        background: p.score >= 65 ? "#10B981" : p.score >= 45 ? "var(--gold)" : "#EF4444",
                      }} />
                      <div style={{
                        position: "absolute", top: -2, height: 10, width: 2,
                        background: "var(--gray)", left: `${benchmark}%`,
                      }} />
                    </div>
                  </div>
                );
              })}
            <p style={{ fontSize: 11, color: "var(--gray)", margin: "16px 0 0" }}>
              ▎ {ui.benchmarkNote} {regionLabel}
            </p>
          </div>
        )}

        {isCEO && (
          <div className="card" style={{ padding: 28, marginBottom: 24 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gray-light)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
              {ui.participation}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "var(--cyan)" }}>
                {completedCount}<span style={{ fontSize: 16, color: "var(--gray)" }}>/{totalCount}</span>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{ui.respondentsCompleted}</div>
                <div style={{ fontSize: 12, color: "var(--gray-light)" }}>
                  {completedCount < totalCount
                    ? `${totalCount - completedCount} ${ui.waitingRespondents}`
                    : ui.allDataAvailable}
                </div>
              </div>
            </div>
            <div style={{ height: 4, background: "var(--dark-border)", borderRadius: 2 }}>
              <div style={{
                height: "100%", borderRadius: 2,
                width: `${Math.round((completedCount / totalCount) * 100)}%`,
                background: completedCount === totalCount ? "#10B981" : "var(--cyan)",
              }} />
            </div>
          </div>
        )}

        <div style={{
          background: "var(--dark-card)", border: "1px solid var(--cyan)",
          borderRadius: 16, padding: 32, textAlign: "center",
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
            {ui.reportComingSoon}
          </h2>
          <p style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
            {ui.reportComingText}{" "}
            {isCEO ? ui.reportCeoNote : ui.reportOtherNote}
          </p>
          <a
            href="https://calendly.com/alex-aumentia"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block", padding: "12px 28px",
              background: "var(--cyan)", color: "var(--dark)",
              borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none",
            }}
          >
            {ui.bookMeeting}
          </a>
        </div>
      </main>
    </div>
  );
}
