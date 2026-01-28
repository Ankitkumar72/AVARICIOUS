
DO $$ 
BEGIN 
  -- Add 'slug' column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'news_posts' 
    AND column_name = 'slug'
  ) THEN
    ALTER TABLE public.news_posts ADD COLUMN slug TEXT UNIQUE;
  END IF;

  -- Add 'category' column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'news_posts' 
    AND column_name = 'category'
  ) THEN
    ALTER TABLE public.news_posts ADD COLUMN category TEXT;
  END IF;

  -- Add 'image_url' column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'news_posts' 
    AND column_name = 'image_url'
  ) THEN
    ALTER TABLE public.news_posts ADD COLUMN image_url TEXT;
  END IF;

  -- Add 'content' column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'news_posts' 
    AND column_name = 'content'
  ) THEN
    ALTER TABLE public.news_posts ADD COLUMN content TEXT;
  END IF;

  -- Add 'coordinates' column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'news_posts' 
    AND column_name = 'coordinates'
  ) THEN
    ALTER TABLE public.news_posts ADD COLUMN coordinates TEXT;
  END IF;

  -- Add 'title' column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'news_posts' 
    AND column_name = 'title'
  ) THEN
    ALTER TABLE public.news_posts ADD COLUMN title TEXT NOT NULL DEFAULT 'Untitled';
  END IF;

  -- Add 'is_published' column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'news_posts' 
    AND column_name = 'is_published'
  ) THEN
    ALTER TABLE public.news_posts ADD COLUMN is_published BOOLEAN DEFAULT true;
  END IF;

  -- Add 'author' column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'news_posts' 
    AND column_name = 'author'
  ) THEN
    ALTER TABLE public.news_posts ADD COLUMN author TEXT;
  END IF;
END $$;

-- 2. Enable Row Level Security
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable read access for all users" ON public.news_posts;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.news_posts;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.news_posts;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.news_posts;

-- 4. Create policies
CREATE POLICY "Enable read access for all users"
  ON public.news_posts FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for authenticated users only"
  ON public.news_posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only"
  ON public.news_posts FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only"
  ON public.news_posts FOR DELETE
  USING (auth.role() = 'authenticated');

-- 5. Create or replace the trigger function for auto-updating updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists to avoid error
DROP TRIGGER IF EXISTS handle_updated_at ON public.news_posts;

-- Create trigger
CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON public.news_posts
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();


