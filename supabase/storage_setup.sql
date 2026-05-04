-- Storage Setup for DelirioSpa
-- Run this in Supabase SQL Editor to configure storage

-- Create the media bucket for storing images, videos, and GIFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policy for public read access to media bucket
CREATE POLICY "Allow public read access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'media');

-- Set up security policy for authenticated users to upload to media bucket
CREATE POLICY "Allow authenticated uploads" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Set up security policy for authenticated users to update/delete their uploads
CREATE POLICY "Allow authenticated updates" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated deletes" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'media' AND auth.role() = 'authenticated');
