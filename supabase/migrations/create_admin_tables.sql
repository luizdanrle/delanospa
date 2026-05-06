-- Criar tabelas para o sistema administrativo completo

-- Tabela de conteúdo do site (para editor tipo WordPress)
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('text', 'heading', 'image', 'video', 'banner', 'hero', 'section', 'button', 'list')),
  content JSONB NOT NULL,
  styles JSONB,
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

-- Tabela de configurações do site
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'global_settings',
  site_name TEXT DEFAULT 'DelirioSpa',
  site_description TEXT,
  site_keywords TEXT[],
  logo_url TEXT,
  favicon_url TEXT,
  primary_color TEXT DEFAULT '#8B5CF6',
  secondary_color TEXT DEFAULT '#EC4899',
  contact_email TEXT,
  contact_phone TEXT,
  contact_whatsapp TEXT,
  social_media JSONB,
  seo_settings JSONB,
  analytics_settings JSONB,
  maintenance_mode BOOLEAN DEFAULT false,
  under_construction BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de banners e hero sections
CREATE TABLE IF NOT EXISTS banners (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT,
  background_color TEXT,
  text_color TEXT DEFAULT '#FFFFFF',
  button_text TEXT,
  button_url TEXT,
  is_active BOOLEAN DEFAULT true,
  position TEXT NOT NULL CHECK (position IN ('home_hero', 'home_secondary', 'services_hero', 'therapists_hero', 'about_hero')),
  order_index INTEGER DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de analytics do site
CREATE TABLE IF NOT EXISTS site_analytics (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  page TEXT,
  section TEXT,
  user_id TEXT,
  session_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de logs de atividades do admin
CREATE TABLE IF NOT EXISTS admin_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Atualizar tabelas existentes com novos campos
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS analytics JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS schedule JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS pricing JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS requirements TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS locations TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS therapists TEXT[] DEFAULT '{}';

ALTER TABLE therapists 
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS analytics JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS schedule JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS gallery_images TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS contact JSONB DEFAULT '{}';

ALTER TABLE locations 
ADD COLUMN IF NOT EXISTS analytics JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS contact JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS coordinates JSONB;

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_site_content_page_section ON site_content(page, section, order_index);
CREATE INDEX IF NOT EXISTS idx_site_content_type ON site_content(type);
CREATE INDEX IF NOT EXISTS idx_banners_position ON banners(position, order_index);
CREATE INDEX IF NOT EXISTS idx_site_analytics_event_type ON site_analytics(event_type, created_at);
CREATE INDEX IF NOT EXISTS idx_admin_logs_user_id ON admin_logs(user_id, created_at);

-- Habilitar RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Criar políticas para admin
DROP POLICY IF EXISTS "Admin full access to site_content" ON site_content;
CREATE POLICY "Admin full access to site_content" ON site_content
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated') WITH CHECK (auth.jwt()->>'role' = 'authenticated');

DROP POLICY IF EXISTS "Admin full access to site_settings" ON site_settings;
CREATE POLICY "Admin full access to site_settings" ON site_settings
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated') WITH CHECK (auth.jwt()->>'role' = 'authenticated');

DROP POLICY IF EXISTS "Admin full access to banners" ON banners;
CREATE POLICY "Admin full access to banners" ON banners
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated') WITH CHECK (auth.jwt()->>'role' = 'authenticated');

DROP POLICY IF EXISTS "Admin full access to site_analytics" ON site_analytics;
CREATE POLICY "Admin full access to site_analytics" ON site_analytics
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated') WITH CHECK (auth.jwt()->>'role' = 'authenticated');

DROP POLICY IF EXISTS "Admin full access to admin_logs" ON admin_logs;
CREATE POLICY "Admin full access to admin_logs" ON admin_logs
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated') WITH CHECK (auth.jwt()->>'role' = 'authenticated');

-- Inserir configurações padrão
INSERT INTO site_settings (id, site_name, site_description, contact_email, contact_phone, contact_whatsapp)
VALUES (
  'global_settings',
  'DelirioSpa',
  'Experiências únicas de massagem sensual e relaxamento em Lisboa',
  'info@deliriospa.pt',
  '+351 210 123 456',
  '+351 912 345 678'
) ON CONFLICT (id) DO NOTHING;

-- Criar função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar triggers para updated_at
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON banners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
