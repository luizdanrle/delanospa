-- Criar tabelas compartilhadas para favoritos e comparações

-- Tabela de favoritos compartilhados
CREATE TABLE IF NOT EXISTS shared_favorites (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT,
  specialty TEXT NOT NULL,
  location TEXT NOT NULL,
  rating DECIMAL(3,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_ip TEXT
);

-- Tabela de comparações compartilhadas
CREATE TABLE IF NOT EXISTS shared_compare (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT,
  specialty TEXT NOT NULL,
  location TEXT NOT NULL,
  rating DECIMAL(3,2) NOT NULL,
  reviews INTEGER DEFAULT 0,
  price INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  experience INTEGER DEFAULT 0,
  services TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  availability TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_ip TEXT
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_shared_favorites_created_at ON shared_favorites(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_shared_favorites_rating ON shared_favorites(rating DESC);
CREATE INDEX IF NOT EXISTS idx_shared_compare_created_at ON shared_compare(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_shared_compare_rating ON shared_compare(rating DESC);

-- Habilitar RLS (Row Level Security) para as tabelas
ALTER TABLE shared_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_compare ENABLE ROW LEVEL SECURITY;

-- Criar políticas para permitir leitura e escrita para todos os usuários
DROP POLICY IF EXISTS "Allow all operations on shared_favorites" ON shared_favorites;
CREATE POLICY "Allow all operations on shared_favorites" ON shared_favorites
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all operations on shared_compare" ON shared_compare;
CREATE POLICY "Allow all operations on shared_compare" ON shared_compare
  FOR ALL USING (true) WITH CHECK (true);

-- Limpar dados antigos (manter apenas os últimos 30 dias)
-- Isso pode ser executado periodicamente via função ou job
DELETE FROM shared_favorites WHERE created_at < NOW() - INTERVAL '30 days';
DELETE FROM shared_compare WHERE created_at < NOW() - INTERVAL '30 days';
