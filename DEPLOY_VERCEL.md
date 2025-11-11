# 🚀 Guia Completo: Conectar Frontend Vercel + Backend Vercel

## Passo 1: Configurar CORS no Backend

Edite o arquivo `src/server.ts` do backend para aceitar requisições do frontend:

```typescript
// src/server.ts
import cors from 'cors';

const app = express();

// Configure CORS ANTES de outras rotas
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://fintech-frontend.vercel.app',  // ← Sua URL do frontend na Vercel
    'https://*.vercel.app'  // ← Aceita todos os previews da Vercel
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**Faça commit e push do backend:**
```bash
cd /caminho/do/backend
git add .
git commit -m "chore: configura CORS para frontend Vercel"
git push origin main
```

---

## Passo 2: Atualizar URL da API no Frontend

Edite o arquivo `.env.production`:

```bash
# /workspaces/fintech-frontend/financing-frontend/.env.production
VITE_API_URL=https://seu-backend-api.vercel.app
VITE_APP_NAME=Financing System
```

**⚠️ IMPORTANTE:** Substitua `seu-backend-api.vercel.app` pela URL real do seu backend deployado.

---

## Passo 3: Deploy do Frontend na Vercel

### Opção A: Via CLI (mais rápido)

```bash
# Instale o Vercel CLI globalmente
npm install -g vercel

# Navegue até a pasta raiz do projeto
cd /workspaces/fintech-frontend

# Faça login na Vercel
vercel login

# Deploy (primeira vez)
vercel

# Siga o wizard:
# - Set up and deploy? Yes
# - Which scope? Sua conta
# - Link to existing project? No
# - Project name? fintech-frontend
# - In which directory is your code? ./financing-frontend
# - Override settings? No

# Deploy para produção
vercel --prod
```

### Opção B: Via GitHub (recomendado)

1. **Conecte seu repositório:**
   - Acesse https://vercel.com/new
   - Clique em "Import Git Repository"
   - Selecione `guilhermerios21/fintech-frontend`

2. **Configure o projeto:**
   ```
   Framework Preset: Vite
   Root Directory: financing-frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Adicione variáveis de ambiente:**
   - Em "Environment Variables", adicione:
     - `VITE_API_URL` = `https://seu-backend.vercel.app`
     - `VITE_APP_NAME` = `Financing System`

4. **Deploy:**
   - Clique em "Deploy"
   - Aguarde o build (~2-3 minutos)

---

## Passo 4: Configurar Variáveis no Dashboard Vercel

Depois do deploy, configure variáveis adicionais:

1. Acesse: https://vercel.com/seu-usuario/fintech-frontend/settings/environment-variables

2. Adicione para **Production, Preview e Development**:
   ```
   VITE_API_URL = https://seu-backend.vercel.app
   VITE_APP_NAME = Financing System
   ```

3. Clique em "Save"

4. **Redeploy** para aplicar as variáveis:
   - Deployments → ⋯ (menu) → Redeploy

---

## Passo 5: Testar a Conexão

1. Abra o frontend: `https://seu-frontend.vercel.app`

2. Abra o DevTools (F12) → Console

3. Teste a API:
   ```javascript
   fetch('https://seu-backend.vercel.app/')
     .then(r => r.json())
     .then(console.log)
   ```

4. Deve retornar:
   ```json
   {
     "message": "🚀 Projeto Backend em Express...",
     "status": "WORKING"
   }
   ```

---

## ✅ Checklist Final

- [ ] CORS configurado no backend
- [ ] Backend deployado e funcionando na Vercel
- [ ] `VITE_API_URL` aponta para o backend correto
- [ ] Frontend deployado na Vercel
- [ ] Variáveis de ambiente configuradas no dashboard
- [ ] Teste de login/cadastro funcionando
- [ ] MongoDB conectado (variável `MONGODB_URI` no backend)

---

## 🐛 Problemas Comuns

### ❌ Erro: "Network Error" ou "CORS Error"

**Solução:**
- Verifique se o CORS está configurado no backend
- Confirme que a URL do frontend está na lista `origin`
- Limpe o cache: Ctrl+Shift+R

### ❌ Erro: "Cannot connect to API"

**Solução:**
- Verifique se `VITE_API_URL` está correto (sem `/` no final)
- Teste o backend diretamente no navegador
- Verifique os logs da Vercel

### ❌ Erro: "401 Unauthorized"

**Solução:**
- JWT configurado no backend (variável `JWT_SECRET`)
- Token sendo salvo no `localStorage`
- Headers `Authorization` corretos

---

## 📝 Comandos Úteis

```bash
# Ver logs do deploy
vercel logs seu-projeto.vercel.app

# Listar todos os deployments
vercel ls

# Remover um deployment antigo
vercel rm deployment-url

# Testar build local
cd financing-frontend
npm run build
npm run preview
```

---

## 🔗 URLs Importantes

- **Frontend**: https://fintech-frontend.vercel.app
- **Backend**: https://seu-backend.vercel.app
- **Dashboard Vercel**: https://vercel.com/dashboard
- **Repositório GitHub**: https://github.com/guilhermerios21/fintech-frontend

---

## 🎯 Próximos Passos

1. Configure domínio customizado (opcional)
2. Configure CI/CD automático via GitHub
3. Adicione Analytics da Vercel
4. Configure redirects personalizados
5. Adicione variáveis de ambiente sensíveis no Vercel (nunca no código)

---

**✨ Pronto! Seu sistema está no ar!** 🚀
