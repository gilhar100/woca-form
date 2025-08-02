
-- Add the analyzed_score column to store the dominant parameter
ALTER TABLE woca_responses ADD COLUMN IF NOT EXISTS analyzed_score TEXT;

-- Update RLS policies to allow inserts on woca_responses
DROP POLICY IF EXISTS "Allow read access for anon" ON woca_responses;
DROP POLICY IF EXISTS "Allow read access for authenticated users" ON woca_responses;
DROP POLICY IF EXISTS "Allow read access to service role" ON woca_responses;
DROP POLICY IF EXISTS "Allow Edge Functions with service role" ON woca_responses;

-- Create comprehensive RLS policies
CREATE POLICY "Anyone can insert WOCA responses" ON woca_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read WOCA responses" ON woca_responses FOR SELECT USING (true);
CREATE POLICY "Service role can do everything" ON woca_responses FOR ALL USING (auth.role() = 'service_role');
