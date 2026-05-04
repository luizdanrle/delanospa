-- Complete Schema for DelirioSpa
-- Run this in Supabase SQL Editor to create all necessary tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Therapists Table
CREATE TABLE IF NOT EXISTS therapists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  gender TEXT NOT NULL CHECK (gender IN ('female', 'male')),
  services TEXT[] DEFAULT '{}',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  location TEXT,
  specialty TEXT,
  experience_years INTEGER DEFAULT 0
);

-- Locations Table
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT,
  map_url TEXT,
  working_hours JSONB DEFAULT '{}'
);

-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  preferences TEXT,
  is_vip BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Table (enhanced)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category TEXT CHECK (category IN ('massage', 'therapy')),
  duration INTEGER,
  image_url TEXT,
  video_url TEXT,
  gif_url TEXT,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Extended fields
  short_name TEXT,
  promo_price DECIMAL(10,2),
  short_description TEXT,
  service_icon TEXT,
  color TEXT,
  gallery TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_promo BOOLEAN DEFAULT false,
  max_capacity INTEGER DEFAULT 1,
  requires_booking BOOLEAN DEFAULT true,
  benefits TEXT[] DEFAULT '{}',
  inclusions TEXT[] DEFAULT '{}',
  contraindications TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT
);

-- Contact Info Table
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  whatsapp TEXT,
  instagram TEXT,
  facebook TEXT,
  twitter TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  google_maps_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default contact info
INSERT INTO contact_info (id, whatsapp, instagram, facebook, twitter, email, phone, address, city, country, google_maps_url)
VALUES (
  uuid_generate_v4(),
  '+351912345678',
  '@deliriospa',
  'facebook.com/deliriospa',
  '@deliriospa',
  'info@deliriospa.pt',
  '+351210123456',
  'Avenida da República, 15',
  'Lisboa',
  'Portugal',
  'https://maps.google.com/?q=DelirioSpa+Lisboa'
)
ON CONFLICT DO NOTHING;

-- Insert sample therapists
INSERT INTO therapists (name, bio, gender, services, image_url, is_active, order_index, location, specialty, experience_years) VALUES
('Sofia', 'Especialista em massagens tântricas com 5 anos de experiência.', 'female', ARRAY['Massagem Tântrica'], '', true, 0, 'Lisboa', 'Tântrica', 5),
('Marco', 'Massagista profissional especializado em terapias de relaxamento.', 'male', ARRAY['Massagem Body to Body'], '', true, 1, 'Lisboa', 'Body to Body', 3),
('Ana', 'Terapeuta especializada em massagens femininas.', 'female', ARRAY['Massagem Yoni'], '', true, 2, 'Porto', 'Yoni', 4),
('Pedro', 'Especialista em massagens masculinas.', 'male', ARRAY['Massagem Lingam'], '', true, 3, 'Porto', 'Lingam', 6),
('Isabela', 'Expert em técnicas de relaxamento profundo.', 'female', ARRAY['Massagem Relaxante'], '', true, 4, 'Algarve', 'Relaxamento', 7),
('Lucas', 'Especialista em massagens para casais.', 'male', ARRAY['Massagem para Casais'], '', true, 5, 'Leiria', 'Casais', 4)
ON CONFLICT DO NOTHING;

-- Insert sample locations
INSERT INTO locations (name, address, city, phone, image_url, is_active, order_index, email, map_url, working_hours) VALUES
('DelirioSpa Saldanha', 'Avenida da República, 15', 'Lisboa', '+351 210 123 456', null, true, 0, 'saldanha@deliriospa.pt', 'https://maps.google.com/?q=Av.+da+República+15+Lisboa', '{"monday_friday": "09:00 - 20:00", "saturday": "10:00 - 18:00", "sunday": "Fechado"}'),
('DelirioSpa Chiado', 'Rua Garrett, 89', 'Lisboa', '+351 210 123 457', null, true, 1, 'chiado@deliriospa.pt', 'https://maps.google.com/?q=Rua+Garrett+89+Lisboa', '{"monday_friday": "09:00 - 20:00", "saturday": "10:00 - 18:00", "sunday": "Fechado"}'),
('DelirioSpa Trindade', 'Rua de Cedofeita, 45', 'Porto', '+351 220 123 456', null, true, 2, 'trindade@deliriospa.pt', 'https://maps.google.com/?q=Rua+de+Cedofeita+45+Porto', '{"monday_friday": "09:00 - 20:00", "saturday": "10:00 - 18:00", "sunday": "Fechado"}'),
('DelirioSpa Clérigos', 'Rua dos Clérigos, 23', 'Porto', '+351 220 123 457', null, true, 3, 'clerigos@deliriospa.pt', 'https://maps.google.com/?q=Rua+dos+Clérigos+23+Porto', '{"monday_friday": "09:00 - 20:00", "saturday": "10:00 - 18:00", "sunday": "Fechado"}'),
('DelirioSpa Marina', 'Avenida 5 de Outubro, 120', 'Algarve', '+351 280 123 456', null, true, 4, 'marina@deliriospa.pt', 'https://maps.google.com/?q=Av.+5+de+Outubro+120+Algarve', '{"monday_friday": "09:00 - 20:00", "saturday": "10:00 - 18:00", "sunday": "Fechado"}'),
('DelirioSpa Centro', 'Rua Herois de Angola, 8', 'Leiria', '+351 240 123 456', null, true, 5, 'centro@deliriospa.pt', 'https://maps.google.com/?q=Rua+Herois+de+Angola+8+Leiria', '{"monday_friday": "09:00 - 20:00", "saturday": "10:00 - 18:00", "sunday": "Fechado"}')
ON CONFLICT DO NOTHING;

-- Insert sample services
INSERT INTO services (name, description, price, category, duration, image_url, is_active, order_index, color) VALUES
('Massagem Tântrica', 'Uma massagem erótica que redistribui as energias sexuais do corpo, expandindo a sensibilidade e proporcionando vivências mais intensas.', 150.00, 'massage', 90, '', true, 0, 'from-orange-500 to-red-600'),
('Massagem Body to Body', 'Uma massagem sensual de corpo inteiro onde a massagista utiliza o corpo nu para estimular o cliente.', 180.00, 'massage', 60, '', true, 1, 'from-pink-500 to-rose-600'),
('Massagem Lingam', 'Uma ode ao sexo masculino. Feita apenas para homens que queiram atingir a plenitude de autoconhecimento.', 140.00, 'massage', 75, '', true, 2, 'from-blue-500 to-cyan-600'),
('Massagem Yoni', 'Destinada a senhoras que queiram explorar o conhecimento do seu corpo e novas sensações de prazer.', 140.00, 'massage', 75, '', true, 3, 'from-purple-500 to-violet-600'),
('Massagem Relaxante', 'Movimentos firmes e suaves proporcionando relaxamento muscular e alívio de tensões.', 100.00, 'massage', 60, '', true, 4, 'from-green-500 to-emerald-600'),
('Massagem para Casais', 'Uma massagem a dois que tem por objetivo aproximar o casal e despertar o prazer partilhado.', 280.00, 'massage', 90, '', true, 5, 'from-fuchsia-500 to-pink-600'),
('Massagem Nuru', 'Utiliza gel Nuru com algas marinhas, permitindo um deslizamento perfeito dos corpos.', 200.00, 'massage', 75, '', true, 6, 'from-teal-500 to-cyan-600'),
('Massagem Desportiva', 'Promove o bem-estar aliviando desconfortos das regiões mais afetadas com dores musculares.', 110.00, 'massage', 60, '', true, 7, 'from-amber-500 to-orange-600'),
('Terapia Holística', 'Abordagem integrada que considera o ser humano como um todo - corpo, mente e espírito.', 120.00, 'therapy', 90, '', true, 8, 'from-indigo-500 to-purple-600'),
('Reflexologia', 'Estimulação de pontos reflexos nos pés para promover equilíbrio energético.', 90.00, 'therapy', 45, '', true, 9, 'from-rose-500 to-pink-600'),
('Reiki', 'Terapia energética japonesa para harmonização dos chakras e bem-estar.', 85.00, 'therapy', 60, '', true, 10, 'from-purple-500 to-violet-600'),
('Massoterapia', 'Tratamento terapêutico completo com técnicas variadas de massagem.', 130.00, 'therapy', 90, '', true, 11, 'from-cyan-500 to-blue-600')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON therapists FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON locations FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON contact_info FOR SELECT USING (true);

-- Create policies for admin full access (you'll need to configure this based on your auth setup)
CREATE POLICY "Allow admin full access" ON therapists FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON locations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON clients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON contact_info FOR ALL USING (auth.role() = 'authenticated');
