# 📋 GUIA DE MODIFICAÇÕES - DelanoSpa

## 🎯 **ONDE MODIFICAR CADA PARTE DO SITE**

---

## 📱 **BARRA SUPERIOR (TOP NAVIGATION)**

### Local: `src/app/page.tsx`
**Linhas:** 638-749 (barra desktop) e 751-812 (menu mobile)

**O que modificar aqui:**
- ✅ **Botões de favoritos e comparação** (linhas 704-719)
- ✅ **Botão de tabela de preços** (linha 718-719)
- ✅ **Botões WhatsApp/Telegram** (linhas 721-749)
- ✅ **Links de navegação** (linhas 760-785)
- ✅ **Logo e título** (linhas 589-597)

---

## 🏷️ **TABELA DE PREÇOS**

### Componente Principal: `src/components/PriceTableButton.tsx`
**O que modificar:**
- ✅ **Preços das massagens** (linhas 25-82 - arrays `massageServices`, `therapeuticServices`, `sportsServices`)
- ✅ **Descrições dos serviços** (campo `description` em cada serviço)
- ✅ **Durações** (campo `duration` em minutos)
- ✅ **Cores e categorias** (campo `color` e `category`)

### Seção Completa: `src/components/PricingTable.tsx`
- ✅ **Tabela completa de preços** na página principal

---

## ❤️ **SISTEMA DE FAVORITOS**

### Favoritos de Massagistas: `src/components/FavoritesSystem.tsx`
**O que modificar:**
- ✅ **Interface do favorito** (linhas 45-85)
- ✅ **Painel de favoritos** (linhas 87-150)
- ✅ **Botão com contador** (linhas 152-180)

### Favoritos de Massagens: `src/components/ServiceFavoritesButton.tsx`
**O que modificar:**
- ✅ **Interface de favoritos de serviços** (linhas 65-95)
- ✅ **Painel de favoritos de serviços** (linhas 97-180)
- ✅ **Botão na barra superior** (linhas 182-210)

---

## ⚖️ **SISTEMA DE COMPARAÇÃO**

### Comparação de Massagistas: `src/components/ComparePanel.tsx`
**O que modificar:**
- ✅ **Interface de comparação** (linhas 50-120)
- ✅ **Painel de comparação** (linhas 122-250)
- ✅ **Botão com contador** (linhas 252-280)

### Comparação de Massagens: `src/components/ServiceComparison.tsx`
**O que modificar:**
- ✅ **Dados das massagens para comparação** (linhas 15-81)
- ✅ **Interface de comparação** (linhas 99-379)

### Botão de Comparação: `src/components/ServiceComparisonButton.tsx`
- ✅ **Botão na barra superior** (componente completo)

---

## 👥 **CARDS DAS MASSAGISTAS**

### Local: `src/components/TherapistCard.tsx`
**O que modificar:**
- ✅ **Informações da massagista** (linhas 67-75 - nome, gênero)
- ✅ **Bio e descrição** (linhas 81-85)
- ✅ **Experiência** (linhas 88-93)
- ✅ **Localização** (linhas 97-102)
- ✅ **Especialidade** (linhas 103-109)
- ✅ **Serviços oferecidos** (linhas 110-118)
- ✅ **Botões de favorito/comparação** (linhas 70-101)

---

## 📋 **BARRA LATERAL DE TÓPICOS**

### Local: `src/components/TopicSidebar.tsx`
**O que modificar:**
- ✅ **Lista de tópicos** (linhas 20-117)
- ✅ **Sub-itens dos tópicos** (campo `subItems`)
- ✅ **Informações do rodapé** (linhas 332-355)
- ✅ **Horário de atendimento** (linha 237)
- ✅ **Avaliação** (linha 241)

---

## 🎨 **SEÇÕES PRINCIPAIS**

### Hero Section: `src/components/SensualHero.tsx`
- ✅ **Banner principal** e **massagistas em destaque**

### Galeria de Modelos: `src/components/ModelGallery.tsx`
- ✅ **Galeria de fotos** das massagistas

### Seção Sobre: `src/components/AboutSection.tsx`
- ✅ **Informações sobre a empresa**

### Regras: `src/components/RulesSection.tsx`
- ✅ **Regras e diretrizes** do serviço

---

## 🌍 **LOCAIS E CONTATOS**

### Mapa: `src/components/LocationsMap.tsx`
- ✅ **Endereços das 6 unidades** em Portugal

### Contatos: Ver em `src/app/page.tsx`
**Linhas:** 1423-1450
- ✅ **Número WhatsApp:** `351912345678`
- ✅ **Telegram:** `@deliriospa`

---

## 📱 **MODO RÁPIDO DE EDIÇÃO**

### Para alterar textos rapidamente:
1. **Preços:** `src/components/PriceTableButton.tsx` (linhas 25-82)
2. **Contatos:** `src/app/page.tsx` (linhas 1423-1450)
3. **Horários:** `src/components/TopicSidebar.tsx` (linha 237)
4. **Tópicos do menu:** `src/components/TopicSidebar.tsx` (linhas 20-117)

### Para alterar cores e estilos:
1. **Cores principais:** Buscar por `from-purple-600`, `from-pink-600`, `from-red-600`
2. **Cores dos botões:** Buscar por `bg-gradient-to-r`
3. **Cores de fundo:** Buscar por `bg-slate-900`, `bg-slate-800`

---

## 🔧 **COMO FAZER ALTERAÇÕES**

### Passo a passo:
1. **Abra o arquivo** indicado acima
2. **Localize a linha** mencionada
3. **Faça a alteração** desejada
4. **Salve o arquivo**
5. **Teste no navegador** (se estiver em desenvolvimento)

### Para subir alterações:
```bash
git add -A
git commit -m "descrição da alteração"
git push origin main
```

---

## 📞 **SUPORTE**

Se precisar de ajuda para encontrar algo específico:
- **Busque por palavras-chave** no código (ex: "WhatsApp", "preço", "massagem")
- **Verifique os arquivos .tsx** na pasta `src/components/`
- **Use o guia acima** como referência rápida

---

**🎯 Este guia foi criado para facilitar suas modificações!**
**Qualquer dúvida, é só perguntar!** 💜
