-- Create the collective_members table
create table if not exists public.collective_members (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null unique,
  identity_hash text,
  node_origin text,
  latency_pref text,
  status text default 'ACTIVE'
);

-- Enable Row Level Security (RLS)
alter table public.collective_members enable row level security;

-- ALLOW public inserts (so the "Join" button works for everyone)
create policy "Enable insert for everyone"
  on public.collective_members for insert
  with check ( true );

-- ALLOW read access (optional)
create policy "Enable read access for all users"
  on public.collective_members for select
  using ( true );
