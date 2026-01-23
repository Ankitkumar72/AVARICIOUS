-- Create a public storage bucket for blog images
insert into storage.buckets (id, name, public)
values ('blog_assets', 'blog_assets', true)
on conflict (id) do nothing;

-- Set up security policies to allow uploads and reads
-- 1. Allow public read access to the bucket
create policy "Public Access to Blog Assets"
  on storage.objects for select
  using ( bucket_id = 'blog_assets' );

-- 2. Allow anyone to upload (For development - restrict in production!)
create policy "Allow Public Uploads"
  on storage.objects for insert
  with check ( bucket_id = 'blog_assets' );

create policy "Allow Public Updates"
  on storage.objects for update
  using ( bucket_id = 'blog_assets' );
