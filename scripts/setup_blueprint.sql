-- BLUEPRINT 2083 SCHEMA

-- 1. Collective Members (Extended Subscriber Data)
CREATE TABLE IF NOT EXISTS collective_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  identity_hash text UNIQUE NOT NULL, -- The USER_NAME_ALPHA (e.g. ELIAS_07)
  access_key text NOT NULL,           -- Simple password/key
  node_origin text,                   -- e.g. Sector 07
  latency_pref text,                  -- e.g. Ultra-Low
  email text UNIQUE NOT NULL,         -- For the Gmail Burst
  clearance_level int DEFAULT 1,      -- Future proofing
  joined_at timestamptz DEFAULT now()
);

-- 2. Secret Bursts (The Clandestine Content)
CREATE TABLE IF NOT EXISTS secret_bursts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  burst_type text NOT NULL,           -- SENSOR_DUMP, FRAGMENTED_MEMORY, ARCHON_INTERNAL, AUDIO_TRANSCRIPT
  subject text NOT NULL,              -- Email Subject
  content text NOT NULL,              -- Email Body (can be raw text)
  scheduled_at timestamptz DEFAULT now(),
  is_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 3. RLS Policies (Open for now to allow easier script access, can be tightened later)
ALTER TABLE collective_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE secret_bursts ENABLE ROW LEVEL SECURITY;

-- Allow public insert for "Joining"
CREATE POLICY "Enable insert for public" ON collective_members FOR INSERT WITH CHECK (true);
-- Allow public select (optional, mainly for scripts/admin)
CREATE POLICY "Enable read for public" ON collective_members FOR SELECT USING (true);

-- Allow public read/write for secret_bursts (Admin Panel usage)
CREATE POLICY "Enable all for public" ON secret_bursts USING (true);
