-- Criar usuário admin para login
-- Execute isso no SQL Editor do Supabase (https://app.supabase.com/project/bpshfkwxbolyzhcfytkg)

-- Opção 1: Usar Auth do Supabase (recomendado)
-- Vá em Authentication > Users > Invite user
-- Email: admin@deliriospa.com
-- Senha: DelirioAdmin123!

-- Opção 2: Inserir direto (se necessário)
-- Note: Auth users são gerenciados pelo Supabase Auth, não pela tabela public

-- Criar política para permitir acesso ao admin
CREATE POLICY IF NOT EXISTS "Allow admin access" ON admin_users
FOR ALL USING (auth.uid() IS NOT NULL);

-- Inserir admin na tabela (após criar usuário no Auth)
INSERT INTO admin_users (id, email, created_at)
VALUES (
  gen_random_uuid(), 
  'admin@deliriospa.com', 
  NOW()
)
ON CONFLICT (email) DO NOTHING;
