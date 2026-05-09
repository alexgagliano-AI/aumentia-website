import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { calculateScores } from "@/lib/scoring";
import { generateReport } from "@/lib/report-generator";
import type { Role } from "@/lib/questions";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const serviceClient = createServiceClient();

  // Fetch audit + company
  const { data: audit } = await serviceClient
    .from("audits")
    .select("*, companies (*)")
    .eq("id", id)
    .single();

  if (!audit) return NextResponse.json({ error: "Audit not found" }, { status: 404 });

  const company = audit.companies as {
    name: string; industry?: string; size?: string; country?: string;
  } | null;

  // Fetch all respondents who completed
  const { data: respondents } = await serviceClient
    .from("respondents")
    .select("id, name, role, status")
    .eq("audit_id", id);

  const completed = respondents?.filter((r) => r.status === "completed") ?? [];

  // Fetch all responses
  const { data: allResponses } = await serviceClient
    .from("responses")
    .select("respondent_id, question_id, answer, score")
    .eq("audit_id", id);

  // Group responses by respondent
  const respondentData = completed.map((r) => ({
    name: r.name,
    role: r.role as Role,
    responses: (allResponses ?? []).filter((res) => res.respondent_id === r.id),
  }));

  const scores = calculateScores(allResponses ?? []);

  try {
    const reportContent = await generateReport({
      company: {
        name: company?.name ?? "l'entreprise",
        industry: company?.industry,
        size: company?.size,
        country: company?.country,
      },
      scores,
      respondents: respondentData,
      respondentCount: completed.length,
      totalInvited: respondents?.length ?? 0,
    });

    // Save report to DB
    await serviceClient
      .from("audits")
      .update({
        report_content: reportContent,
        report_generated_at: new Date().toISOString(),
        status: "completed",
      })
      .eq("id", id);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Report generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
