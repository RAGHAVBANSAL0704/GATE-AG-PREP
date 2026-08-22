-- ========================================================
-- GATE AG PREP PORTAL - GENDER & ADMISSION NO FORMAT SCHEMA UPDATE
-- ========================================================

-- 1. Add gender column to students table
alter table public.students add column if not exists gender text check (gender in ('Male', 'Female', 'Other'));

-- 2. Index for gender analytics
create index if not exists idx_students_gender on public.students(gender);
