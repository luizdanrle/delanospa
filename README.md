# DelanoSpa - Sistema de Gestão de Spa Premium

Sistema completo de gestão para spa de massagens premium com design dark mode tecnológico, animações 3D e painel de administração integrado com Supabase.

## Funcionalidades

### Site Público
- **Design Dark Mode** tecnológico e moderno
- **Animações 3D** no hero com Three.js/React Three Fiber
- **Site Responsivo** para todos os dispositivos
- **Transições suaves** com Framer Motion
- **Todos os serviços** do genuine-tantric.com (melhorados):
  - Massagens Tântricas, Body to Body, Lingam, Yoni
  - Massagens para Casais, Nuru, Relaxamento, Desportiva
  - Terapias: Holística, Reflexologia, Reiki, Shiatsu, Massoterapia
- **Massagistas** femininos e masculinos
- **Vários locais**: Lisboa, Porto, Algarve, Leiria
- **Testemunhos** de clientes
- **Botões WhatsApp** para reserva direta

### Painel de Administração
- **Login seguro** via Supabase Auth
- **Dashboard** moderno com estatísticas
- **Gestão de Serviços**:
  - Listar todos os serviços
  - Adicionar novo serviço (nome, preço, descrição, duração)
  - Upload de imagens, GIFs e vídeos
  - Editar e eliminar serviços
  - Ativar/desativar serviços
- **Gestão de Contactos**:
  - WhatsApp, Instagram, Facebook, Twitter
  - Email, telefone
  - Morada e link Google Maps
- **Gestão de Locais**:
  - Adicionar/editar locais
  - Endereços por cidade

## Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Supabase** - Backend, Banco de Dados, Storage, Auth
- **Three.js + React Three Fiber** - Animações 3D
- **Framer Motion** - Animações UI
- **Lucide React** - Ícones

## Configuração do Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Vá para o SQL Editor e execute o script em `supabase/schema.sql`
3. Configure o Storage:
   - Crie um bucket chamado `media` (público)
   - Configure as políticas de acesso
4. Em Authentication > Settings, configure:
   - Site URL: URL do seu site
   - Redirect URLs: `/admin/dashboard`

## Variáveis de Ambiente

Crie um ficheiro `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
```

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse:
- Site público: http://localhost:3000
- Login admin: http://localhost:3000/admin/login

## Estrutura do Projeto

```
delanospa/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/page.tsx      # Página de login
│   │   │   ├── dashboard/page.tsx  # Dashboard admin
│   │   │   └── services/
│   │   │       ├── new/page.tsx    # Criar serviço
│   │   │       └── edit/[id]/page.tsx # Editar serviço
│   │   ├── page.tsx                # Site público
│   │   ├── layout.tsx              # Layout principal
│   │   └── globals.css             # Estilos globais
│   ├── components/
│   │   ├── Hero3D.tsx              # Animação 3D hero
│   │   ├── ServiceCard.tsx         # Card de serviço
│   │   ├── TherapistCard.tsx     # Card de massagista
│   │   ├── LocationCard.tsx        # Card de local
│   │   ├── Testimonials.tsx        # Testemunhos
│   │   └── Footer.tsx              # Rodapé
│   ├── contexts/
│   │   └── AuthContext.tsx         # Contexto de autenticação
│   ├── lib/
│   │   ├── supabase.ts             # Cliente Supabase
│   │   └── utils.ts                # Utilitários
│   └── types/
│       └── index.ts                # Tipos TypeScript
├── supabase/
│   └── schema.sql                  # Schema da base de dados
└── public/                         # Ficheiros estáticos
```

## Primeiro Acesso (Admin)

1. Crie uma conta no Supabase Auth
2. Aceda a `/admin/login`
3. Inicie sessão com as credenciais criadas
4. O dashboard estará disponível

## Deploy no Vercel (Recomendado)

### 1. Preparação Local

```bash
# Instalar dependências
npm install

# Build de produção
npm run build
```

### 2. Deploy no Vercel

**Opção A - Via CLI:**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login e deploy
vercel login
vercel
```

**Opção B - Via GitHub (Recomendado):**
1. Crie um repositório no GitHub
2. Faça push do código:
```bash
git add .
git commit -m "Initial commit - DelanoSpa"
git branch -M main
git remote add origin https://github.com/seuusuario/delanospa.git
git push -u origin main
```
3. Conecte o repositório na Vercel:
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Add New Project"
   - Importe do GitHub
   - Configure as variáveis de ambiente

### 3. Variáveis de Ambiente no Vercel

No dashboard da Vercel, adicione:
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

### 4. Configurações de Build

O `next.config.ts` já está configurado para exportação estática:
```typescript
output: 'export',
distDir: 'dist'
```

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## Personalização

### Cores
Edite as classes Tailwind no código. O tema principal usa:
- Roxo: `purple-500`, `purple-600`
- Rosa: `pink-500`, `pink-600`
- Fundo: `slate-950`, `slate-900`

### Conteúdo
- Serviços: Gestão via dashboard admin
- Contactos: Atualizáveis em tempo real no dashboard
- Locais: Adicione/editar no dashboard

## Suporte

Para questões ou problemas:
1. Verifique a consola do browser
2. Verifique os logs do Supabase
3. Confirme as variáveis de ambiente

## Licença

Este projeto foi criado para DelanoSpa.
Todos os direitos reservados.
