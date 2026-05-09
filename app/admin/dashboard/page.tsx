import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: audits } = await supabase
    .from("audits")
    .select(`
      id, title, status, created_at, completed_at,
      companies (name, industry, size, country),
      respondents (id, status)
    `)
    .order("created_at", { ascending: false });

  const stats = {
    total: audits?.length ?? 0,
    active: audits?.filter((a) => a.status === "active").length ?? 0,
    completed: audits?.filter((a) => a.status === "completed" || a.status === "reported").length ?? 0,
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)" }}>
      <AdminNav user={user} />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 4 }}>
              Diagnostics IA
            </h1>
            <p style={{ color: "var(--gray-light)", fontSize: 14 }}>
              Gérez vos diagnostics et suivez la progression des répondants.
            </p>
          </div>
          <Link
            href="/admin/audits/new"
            style={{
              padding: "11px 22px", background: "var(--cyan)", color: "var(--dark)",
              borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            + Nouveau diagnostic
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 36 }}>
          {[
            { label: "Total", value: stats.total, color: "var(--cyan)" },
            { label: "En cours", value: stats.active, color: "var(--gold)" },
            { label: "Complétés", value: stats.completed, color: "#10B981" },
          ].map((s) => (
            <div key={s.label} className="card" style={{ padding: "20px 24px" }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "var(--gray-light)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Audits list */}
        {!audits || audits.length === 0 ? (
          <div className="card" style={{ padding: 48, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🎯</div>
            <p style={{ color: "var(--gray-light)", fontSize: 16, marginBottom: 20 }}>
              Aucun diagnostic créé pour l&apos;instant.
            </p>
            <Link
              href="/admin/audits/new"
              style={{
                padding: "11px 22px", background: "var(--cyan)", color: "var(--dark)",
                borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none",
              }}
            >
              Créer le premier diagnostic →
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {audits.map((audit) => {
              const company = audit.companies as unknown as { name: string; industry?: string; size?: string } | null;
              const respondents = audit.respondents as { id: string; status: string }[] | null ?? [];
              const completed = respondents.filter((r) => r.status === "completed").length;
              const total = respondents.length;
              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
              const statusColors: Record<string, string> = {
                draft: "var(--gray)",
                active: "var(--gold)",
                completed: "#10B981",
                reported: "var(--cyan)",
              };
              const statusLabels: Record<string, string> = {
                draft: "Brouillon",
                active: "En cours",
                completed: "Complété",
                reported: "Rapport envoyé",
              };
              return (
                <Link
                  key={audit.id}
                  href={`/admin/audits/${audit.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card" style={{ padding: "20px 24px", cursor: "pointer" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--cyan)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--dark-border)")}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                          <span style={{ fontSize: 16, fontWeight: 700 }}>{company?.name ?? "—"}</span>
                          <span style={{
                            fontSize: 11, fontWeight: 600, padding: "2px 8px",
                            borderRadius: 100, border: `1px solid ${statusColors[audit.status]}`,
                            color: statusColors[audit.status], background: `${statusColors[audit.status]}20`,
                          }}>
                            {statusLabels[audit.status]}
                          </span>
                        </div>
                        <div style={{ fontSize: 13, color: "var(--gray-light)" }}>
                          {audit.title}
                          {company?.industry && ` · ${company.industry}`}
                          {company?.size && ` · ${company.size}`}
                        </div>
                      </div>

                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                          <span style={{ color: "var(--cyan)" }}>{completed}</span>
                          <span style={{ color: "var(--gray)" }}>/{total}</span>
                          <span style={{ fontSize: 12, color: "var(--gray-light)", marginLeft: 4 }}>répondants</span>
                        </div>
                        {total > 0 && (
                          <div style={{ width: 120, height: 4, background: "var(--dark-border)", borderRadius: 2 }}>
                            <div style={{
                              height: "100%", borderRadius: 2, transition: "width 0.3s",
                              width: `${pct}%`,
                              background: pct === 100 ? "#10B981" : "var(--cyan)",
                            }} />
                          </div>
                        )}
                      </div>

                      <div style={{ color: "var(--gray)", fontSize: 18 }}>→</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
