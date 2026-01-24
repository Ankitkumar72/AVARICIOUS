-- Create the subscribers table
create table if not exists public.subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  status text default 'active',
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.subscribers enable row level security;

-- ALLOW public inserts (so the "Connect" button works for visitors)
create policy "Enable insert for everyone"
  on public.subscribers for insert
  with check ( true );

-- ALLOW everyone to read (for debugging, or maybe restrict this later)
create policy "Enable read access for all users"
  on public.subscribers for select
  using ( true );
