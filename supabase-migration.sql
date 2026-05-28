-- ============================================
-- Next-Gen Learning Dashboard — Supabase Migration
-- ============================================
-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql

-- 1. Create the courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_emoji TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (allow public read)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON courses
  FOR SELECT
  TO anon
  USING (true);

-- 3. Seed sample data
INSERT INTO courses (title, progress, icon_emoji, is_completed) VALUES
  ('Advanced React Patterns', 75, '⚛️', false),
  ('Node.js Microservices', 92, '🟢', true),
  ('TypeScript Mastery', 60, '🔷', false),
  ('System Design Fundamentals', 45, '🏗️', false),
  ('GraphQL & Apollo', 88, '🔮', true),
  ('Docker & Kubernetes', 30, '🐳', false);
