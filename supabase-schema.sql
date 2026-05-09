-- ============================================================
-- Aumentia Diagnostic IA — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Admin profiles (linked to Supabase Auth users)
CREATE TABLE admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'coach' CHECK (role IN ('admin', 'coach')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Companies (audit clients)
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT,
  size TEXT CHECK (size IN ('1-10', '11-50', '51-200', '201-500', '500+')),
  country TEXT DEFAULT 'Belgique',
  region TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Audits / Diagnostics
CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'reported')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  report_content TEXT,
  report_generated_at TIMESTAMPTZ,
  report_sent_at TIMESTAMPTZ,
  notes TEXT
);

-- Respondents (people invited to fill the questionnaire)
CREATE TABLE respondents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ceo', 'cfo', 'coo', 'sales', 'ops', 'hr', 'employee')),
  token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'completed')),
  sent_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  reminder_count INT NOT NULL DEFAULT 0,
  last_reminder_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Individual question responses
CREATE TABLE responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  respondent_id UUID NOT NULL REFERENCES respondents(id) ON DELETE CASCADE,
  audit_id UUID NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  answer TEXT,
  score INT CHECK (score >= 1 AND score <= 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(respondent_id, question_id)
);

-- Row Level Security
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE respondents ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- Policies: admin users can read/write everything
CREATE POLICY "Admins full access on companies" ON companies
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access on audits" ON audits
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access on respondents" ON respondents
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access on responses" ON responses
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access on admin_profiles" ON admin_profiles
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Service role bypasses RLS for API routes
-- Anon can insert/read responses via token (handled in API with service key)
