# Financing System Frontend

Frontend para sistema de financiamento de veículos.

## 🚀 Deploy na Vercel

### Passo 1: Preparar o Backend
Certifique-se que seu backend está rodando na Vercel e configure CORS:

```typescript
// No seu backend (server.ts ou app.ts)
import cors from 'cors';

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'https://seu-frontend.vercel.app' // Adicione a URL do frontend aqui
  ],
  credentials: true
}));
```

### Passo 2: Deploy do Frontend

1. **Instale o Vercel CLI** (se ainda não tiver):
```bash
npm install -g vercel
```

2. **Configure a variável de ambiente da API**:
   - Acesse: https://vercel.com/seu-usuario/fintech-frontend/settings/environment-variables
   - Adicione: `VITE_API_URL` = `https://seu-backend.vercel.app`

3. **Deploy via CLI**:
```bash
cd /workspaces/fintech-frontend
vercel
```

Ou via **GitHub**:
   - Conecte seu repositório no dashboard da Vercel
   - Configure a variável `VITE_API_URL` nas configurações
   - O deploy será automático a cada push

### Passo 3: Configurar Variáveis de Ambiente

Na Vercel Dashboard:
- Project Settings → Environment Variables
- Adicione:
  - `VITE_API_URL` → URL do seu backend
  - `VITE_APP_NAME` → Financing System

### 🔧 Desenvolvimento Local

```bash
# Instalar dependências
cd financing-frontend
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### 📝 Estrutura de Variáveis de Ambiente

- `.env` - Desenvolvimento local
- `.env.production` - Produção (Vercel)
- `.env.example` - Template

### ⚙️ Configurações Importantes

O `vercel.json` já está configurado para:
- ✅ Build automático do Vite
- ✅ Rewrites para SPA routing
- ✅ Clean URLs
- ✅ Output correto do dist/

## 📦 Stack

- React 18.2
- TypeScript 5.3
- Vite 5.4
- TailwindCSS 3.3
- Axios 1.6
- React Router v6
