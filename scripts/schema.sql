-- ========================================================
-- GATE AG PREP PORTAL - COMPLETE SUPABASE DATABASE SCHEMA
-- ========================================================

-- 1. Create Students Table
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  student_type text default 'hau' check (student_type in ('hau', 'non_hau', 'visitor', 'external')),
  full_name text not null,
  username text unique,
  gender text default 'Male' check (gender in ('Male', 'Female', 'Other')),
  mobile_number text,
  admission_no text,
  email text,
  password_hash text,
  has_custom_password boolean default false,
  profile_updates_count integer default 0,
  last_update_timestamp timestamptz,
  address text,
  profile_photo_url text,
  current_year_sem text,
  email_verified boolean default false,
  dob text,
  college_name text,
  degree text,
  graduation_year text,
  target_year text default '2027',
  xp_points numeric default 0,
  break_xp numeric default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ensure missing columns are added if students table already existed
alter table public.students add column if not exists username text;
alter table public.students add column if not exists gender text check (gender in ('Male', 'Female', 'Other'));
alter table public.students add column if not exists password_hash text;
alter table public.students add column if not exists has_custom_password boolean default false;
alter table public.students add column if not exists profile_updates_count integer default 0;
alter table public.students add column if not exists last_update_timestamp timestamptz;
alter table public.students add column if not exists address text;
alter table public.students add column if not exists profile_photo_url text;
alter table public.students add column if not exists current_year_sem text;
alter table public.students add column if not exists email_verified boolean default false;
alter table public.students add column if not exists xp_points numeric default 0;
alter table public.students add column if not exists break_xp numeric default 0;

-- Drop insecure plaintext password column if present
alter table public.students drop column if exists password_plain;

-- Update student_type constraint if table was previously created with old check constraint
alter table public.students drop constraint if exists students_student_type_check;
alter table public.students add constraint students_student_type_check check (student_type in ('hau', 'non_hau', 'visitor', 'external'));

-- Fast Lookup Indexes for students
create index if not exists idx_students_username on public.students(username);
create index if not exists idx_students_admission_no on public.students(admission_no);
create index if not exists idx_students_email on public.students(email);
create index if not exists idx_students_gender on public.students(gender);

-- Enable RLS for students
alter table public.students enable row level security;
drop policy if exists "Public select students" on public.students;
drop policy if exists "Public insert students" on public.students;
drop policy if exists "Public update students" on public.students;
drop policy if exists "Allow reading student profiles" on public.students;
drop policy if exists "Allow student self-registration" on public.students;
drop policy if exists "Allow students to update own profile" on public.students;

create policy "Allow reading student profiles" on public.students for select using (true);
create policy "Allow student self-registration" on public.students for insert with check (true);
create policy "Allow students to update own profile" on public.students for update using (id is not null) with check (id is not null);


-- 2. Create Device Sessions Table
create table if not exists public.device_sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete cascade,
  device_token text,
  device_info text,
  device_id text,
  user_agent text,
  ip_address text,
  last_login_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Ensure device_sessions schema columns match authService
alter table public.device_sessions add column if not exists device_token text;
alter table public.device_sessions add column if not exists device_info text;

-- Fast Lookup Indexes for device_sessions
create index if not exists idx_device_sessions_student_id on public.device_sessions(student_id);
create index if not exists idx_device_sessions_device_token on public.device_sessions(device_token);

-- Enable RLS for device_sessions
alter table public.device_sessions enable row level security;
drop policy if exists "Public select device_sessions" on public.device_sessions;
drop policy if exists "Public insert device_sessions" on public.device_sessions;
drop policy if exists "Public update device_sessions" on public.device_sessions;
drop policy if exists "Allow device sessions select" on public.device_sessions;
drop policy if exists "Allow device sessions insert" on public.device_sessions;
drop policy if exists "Allow device sessions update" on public.device_sessions;

create policy "Allow device sessions select" on public.device_sessions for select using (true);
create policy "Allow device sessions insert" on public.device_sessions for insert with check (student_id is not null);
create policy "Allow device sessions update" on public.device_sessions for update using (id is not null);


-- 3. Create Test Attempts History Table
create table if not exists public.test_attempts (
  id uuid primary key default gen_random_uuid(),
  client_attempt_id text,
  student_id uuid references public.students(id) on delete set null,
  student_name text not null,
  admission_no text,
  email text,
  mobile_number text,
  paper_title text not null,
  paper_year text,
  test_type text default 'cbt_mock' check (test_type in ('cbt_mock', 'custom_mock', 'practice_pool', 'pyq', 'section_practice')),
  score numeric(5, 2) not null,
  total_marks numeric(5, 2) default 100,
  percentage numeric(5, 2),
  accuracy_percentage numeric(5, 2),
  correct_count integer default 0,
  incorrect_count integer default 0,
  unattempted_count integer default 0,
  total_questions integer default 65,
  time_spent_seconds integer default 0,
  question_responses jsonb,
  submitted_at timestamptz default now()
);

-- Ensure client_attempt_id and test_type check constraint exist
alter table public.test_attempts add column if not exists client_attempt_id text;
alter table public.test_attempts drop constraint if exists test_attempts_test_type_check;
alter table public.test_attempts add constraint test_attempts_test_type_check check (test_type in ('cbt_mock', 'custom_mock', 'practice_pool', 'pyq', 'section_practice'));

-- Fast Lookup Indexes and Unique Idempotency Index for test_attempts
create unique index if not exists idx_test_attempts_client_id on public.test_attempts(client_attempt_id);
create index if not exists idx_test_attempts_student_id on public.test_attempts(student_id);
create index if not exists idx_test_attempts_admission_no on public.test_attempts(admission_no);
create index if not exists idx_test_attempts_submitted_at on public.test_attempts(submitted_at);

-- Enable RLS for test_attempts
alter table public.test_attempts enable row level security;
drop policy if exists "Public select test_attempts" on public.test_attempts;
drop policy if exists "Public insert test_attempts" on public.test_attempts;
drop policy if exists "Public update test_attempts" on public.test_attempts;
drop policy if exists "Allow reading test attempts" on public.test_attempts;
drop policy if exists "Allow inserting test attempts" on public.test_attempts;
drop policy if exists "Allow updating own test attempts" on public.test_attempts;

create policy "Allow reading test attempts" on public.test_attempts for select using (true);
create policy "Allow inserting test attempts" on public.test_attempts for insert with check (student_name is not null or student_id is not null);
create policy "Allow updating own test attempts" on public.test_attempts for update using (client_attempt_id is not null or id is not null);

-- 4. Reload PostgREST Schema Cache so newly added columns (like username) are immediately detected
NOTIFY pgrst, 'reload schema';

