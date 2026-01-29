-- Create email_logs table
create table if not exists public.email_logs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  recipient text not null,
  subject text,
  status text not null, -- 'SENT', 'FAILED'
  error text,
  trigger_source text -- 'WELCOME', 'BURST', 'DIGEST'
);

-- Enable RLS
alter table public.email_logs enable row level security;

-- Policies
-- Admin can view all logs
create policy "Admins can view all logs"
  on public.email_logs for select
  using ( true ); -- In real strict mode, check for admin role. For now, open to app.

-- App can insert logs
create policy "App can insert logs"
  on public.email_logs for insert
  with check ( true );
