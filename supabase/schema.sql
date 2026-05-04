-- DelirioSpa Database Schema for Supabase
-- Run this in the Supabase SQL Editor

-- Enable RLS
alter table if exists public.services enable row level security;
alter table if exists public.therapists enable row level security;
alter table if exists public.contact_info enable row level security;
alter table if exists public.locations enable row level security;

-- Drop existing tables if they exist
drop table if exists public.services cascade;
drop table if exists public.therapists cascade;
drop table if exists public.contact_info cascade;
drop table if exists public.locations cascade;

-- Create Services Table
CREATE TABLE public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('massage', 'therapy')),
    duration INTEGER NOT NULL,
    image_url TEXT,
    video_url TEXT,
    gif_url TEXT,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create Therapists Table
CREATE TABLE public.therapists (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('female', 'male')),
    services UUID[] DEFAULT '{}',
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create Contact Info Table
CREATE TABLE public.contact_info (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    whatsapp VARCHAR(50),
    instagram VARCHAR(100),
    facebook VARCHAR(100),
    twitter VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Portugal',
    google_maps_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create Locations Table
CREATE TABLE public.locations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create Storage Bucket for Media
-- Note: Run this in Supabase Dashboard > Storage > New Bucket
-- Bucket name: media
-- Public: true

-- RLS Policies for Services
CREATE POLICY "Services are viewable by everyone" 
ON public.services FOR SELECT USING (true);

CREATE POLICY "Services are insertable by authenticated users only" 
ON public.services FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Services are updatable by authenticated users only" 
ON public.services FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Services are deletable by authenticated users only" 
ON public.services FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for Therapists
CREATE POLICY "Therapists are viewable by everyone" 
ON public.therapists FOR SELECT USING (true);

CREATE POLICY "Therapists are insertable by authenticated users only" 
ON public.therapists FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Therapists are updatable by authenticated users only" 
ON public.therapists FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Therapists are deletable by authenticated users only" 
ON public.therapists FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for Contact Info
CREATE POLICY "Contact info is viewable by everyone" 
ON public.contact_info FOR SELECT USING (true);

CREATE POLICY "Contact info is updatable by authenticated users only" 
ON public.contact_info FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS Policies for Locations
CREATE POLICY "Locations are viewable by everyone" 
ON public.locations FOR SELECT USING (true);

CREATE POLICY "Locations are insertable by authenticated users only" 
ON public.locations FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Locations are updatable by authenticated users only" 
ON public.locations FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Locations are deletable by authenticated users only" 
ON public.locations FOR DELETE USING (auth.role() = 'authenticated');

-- Storage RLS Policies
-- Note: Configure these in Supabase Dashboard > Storage > Policies
-- Allow public to view media
-- Allow authenticated users to upload/delete media

-- Insert default contact info
INSERT INTO public.contact_info (whatsapp, instagram, facebook, twitter, email, phone, address, city, country)
VALUES (
    '+351 912 345 678',
    '@deliriospa',
    'facebook.com/deliriospa',
    '@deliriospa',
    'info@deliriospa.pt',
    '+351 210 123 456',
    'Avenida da República, 15',
    'Lisboa',
    'Portugal',
    'https://maps.google.com/?q=Avenida+da+Republica+15+Lisboa'
);

-- Insert default locations
INSERT INTO public.locations (name, address, city, phone, is_active, order_index) VALUES
('DelirioSpa Saldanha', 'Avenida da República, 15', 'Lisboa', '+351 210 123 456', true, 1),
('DelirioSpa Chiado', 'Rua Garrett, 89', 'Lisboa', '+351 210 234 567', true, 2),
('DelirioSpa Trindade', 'Rua de Cedofeita, 45', 'Porto', '+351 220 123 456', true, 3),
('DelirioSpa Clérigos', 'Rua dos Clérigos, 23', 'Porto', '+351 220 234 567', true, 4),
('DelirioSpa Marina', 'Avenida 5 de Outubro, 120', 'Algarve', '+351 282 123 456', true, 5),
('DelirioSpa Centro', 'Rua Herois de Angola, 8', 'Leiria', '+351 244 123 456', true, 6);

-- Insert sample services
INSERT INTO public.services (name, price, description, category, duration, is_active, order_index) VALUES
('Massagem Tântrica', 150.00, 'Uma massagem erótica que redistribui as energias sexuais do corpo, expandindo a sensibilidade e proporcionando vivências mais intensas.', 'massage', 90, true, 1),
('Massagem Body to Body', 180.00, 'Uma massagem sensual de corpo inteiro onde a massagista utiliza o corpo nu para estimular o cliente.', 'massage', 60, true, 2),
('Massagem Lingam', 140.00, 'Uma ode ao sexo masculino. Feita apenas para homens que queiram atingir a plenitude de autoconhecimento.', 'massage', 75, true, 3),
('Massagem Yoni', 140.00, 'Destinada a senhoras que queiram explorar o conhecimento do seu corpo e novas sensações de prazer.', 'massage', 75, true, 4),
('Massagem de Relaxamento', 100.00, 'Movimentos firmes e suaves sobre o corpo, proporcionando relaxamento muscular e alívio de tensões.', 'massage', 60, true, 5),
('Massagem para Casais', 280.00, 'Uma massagem a dois que tem por objetivo aproximar o casal, despertando-o para o prazer partilhado.', 'massage', 90, true, 6),
('Terapia Holística', 120.00, 'Abordagem integrada que considera o ser humano como um todo - corpo, mente e espírito.', 'therapy', 90, true, 7),
('Reflexologia', 90.00, 'Estimulação de pontos reflexos nos pés para promover equilíbrio energético.', 'therapy', 45, true, 8);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_therapists_updated_at BEFORE UPDATE ON public.therapists
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON public.locations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON public.contact_info
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
