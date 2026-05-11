-- Add language column to audits table
-- Run this in Supabase SQL Editor

ALTER TABLE audits
ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'fr'
CHECK (language IN ('fr', 'en', 'it'));
