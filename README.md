# Financing System - Frontend## Backend em Express com Autenticação JWT e MongoDB



Sistema de financiamento de veículos com interface moderna e responsiva.API RESTful construída com Node.js, Express 5, TypeScript e MongoDB (via Mongoose), com autenticação JWT, rotas protegidas e um CRUD de tarefas com exclusão lógica (soft delete).



## 🚀 Tecnologias---



- **React 18.2** - Biblioteca UI## ✨ Recursos

- **TypeScript 5.3** - Tipagem estática

- **Vite 5.4** - Build tool e dev server- Cadastro e login de usuários com senha criptografada (bcrypt)

- **TailwindCSS 3.3** - Framework CSS utilitário- Autenticação com JWT e middleware de proteção

- **React Router v6** - Navegação SPA- CRUD de tarefas por usuário (criar, listar, obter, atualizar total/parcial, deletar e restaurar)

- **Axios 1.6** - Cliente HTTP- Exclusão lógica de tarefas (flag `deleted`)

- **Context API** - Gerenciamento de estado- Validações básicas e middleware de erros

- Suporte a Docker (MongoDB + Mongo Express), TypeScript e scripts de desenvolvimento

## ✨ Funcionalidades

---

- 🎨 Interface moderna com tema claro (roxo #6D4AFF)

- 📱 Design 100% responsivo## 🧰 Stack

- 🔐 Sistema de autenticação JWT

- 💰 Simulador de financiamento com cálculo de parcelas- Node.js 20

- 📊 Tabela de amortização detalhada- Express 5

- 📈 Acompanhamento de status de solicitações- TypeScript 5

- ⚡ Performance otimizada com Vite- Mongoose 8 (MongoDB)

- JSON Web Token (JWT)

## 🛠️ Instalação e Uso- bcryptjs

- Docker (opcional para o banco)

### Pré-requisitos

---

- Node.js 18+ 

- npm ou yarn## 📂 Estrutura de Pastas



### Instalação```

.

```bash├─ Dockerfile

# Clone o repositório├─ docker-compose.yml              # MongoDB + Mongo Express

git clone https://github.com/guilhermerios21/fintech-frontend.git├─ package.json

cd fintech-frontend├─ tsconfig.json

├─ requests/

# Entre na pasta do frontend│  └─ resquests.yml                # Coleção Postman

cd financing-frontend└─ src/

	 ├─ server.ts                    # Bootstrap do servidor

# Instale as dependências	 ├─ database/

npm install	 │  └─ connect.ts                # Conexão com MongoDB (MONGODB_URI)

	 ├─ models/

# Configure as variáveis de ambiente	 │  ├─ User.ts                   # Schema de usuário

cp .env.example .env	 │  └─ Task.ts                   # Schema de tarefa (soft delete)

```	 ├─ services/

	 │  ├─ UserService.ts            # Login e registro + geração de JWT

### Configuração	 │  └─ taskServices.ts           # Regras de negócio de tarefas

	 ├─ controllers/

Edite o arquivo `.env` com suas configurações:	 │  ├─ userController.ts

	 │  ├─ taskController.ts

```env	 │  └─ protectedController.ts

VITE_API_URL=http://localhost:5000	 ├─ middleware/

VITE_APP_NAME=Financing System	 │  ├─ protectedMiddleware.ts    # Verifica e decodifica JWT

```	 │  └─ errorMiddlleware.ts       # Tratamento de erros

	 ├─ routes/

### Executar em Desenvolvimento	 │  ├─ userRoute.ts              # /api/register, /api/login

	 │  ├─ taskRoutes.ts             # /api/tasks...

```bash	 │  └─ protectedRoute.ts         # /api/protected

npm run dev	 └─ types/

```			└─ environment.d.ts          # Tipagem das variáveis de ambiente

```

Acesse: http://localhost:3000

---

### Build para Produção

## ⚙️ Pré-requisitos

```bash

npm run build- Node.js 18+ (recomendado 20)

npm run preview- npm 9+

```- Docker (opcional, para subir MongoDB localmente)



## 📁 Estrutura do Projeto---



```## 🔐 Variáveis de Ambiente (.env)

financing-frontend/

├── src/Crie um arquivo `.env` na raiz do projeto com:

│   ├── components/        # Componentes reutilizáveis

│   │   ├── Header.tsx```

│   │   ├── Footer.tsxPORT=3000

│   │   ├── LoanForm.tsx# Se usar o docker-compose deste repo, use auth básica (admin) e escolha um DB (ex.: miniprojeto)

│   │   └── PaymentSchedule.tsxMONGODB_URI=mongodb://root:example@localhost:27017/miniprojeto?authSource=admin

│   ├── pages/            # Páginas da aplicaçãoJWT_SECRET=uma_chave_muito_secreta

│   │   ├── Home.tsx```

│   │   ├── Apply.tsx

│   │   ├── Status.tsxObservações:

│   │   └── Confirmation.tsx- `MONGODB_URI` é obrigatório. O app encerra se estiver ausente.

│   ├── services/         # Integração com API- `JWT_SECRET` é obrigatório para assinar/verificar tokens.

│   │   └── api.ts- `PORT` é opcional (padrão 3000).

│   ├── store/           # Context API

│   │   └── index.tsx---

│   ├── types/           # Definições TypeScript

│   │   └── index.ts## 🚀 Como rodar

│   ├── styles/          # Estilos globais

│   │   └── globals.css### 1) Subir somente o banco via Docker Compose (opcional, recomendado)

│   └── App.tsx          # Componente raiz

├── public/              # Arquivos estáticosNo diretório do projeto:

├── .env.example         # Template de variáveis

└── vite.config.ts       # Configuração do Vite```powershell

```docker compose up -d

```

## 🎨 Design System

Isso cria:

### Cores- MongoDB em `mongodb://root:example@localhost:27017/` (authSource=admin)

- Mongo Express em http://localhost:8081 (login: mongoexpressuser / mongoexpresspass)

- **Primário**: `#6D4AFF` (Roxo)

- **Hover**: `#5938F0` (Roxo escuro)Depois, aponte o `MONGODB_URI` no `.env` para seu banco (ex.: `.../miniprojeto?authSource=admin`).

- **Background**: `#F2F2F4` (Cinza claro)

- **Surface**: `#FFFFFF` (Branco)### 2) Instalar dependências

- **Texto**: `#111827` (Cinza escuro)

```powershell

### Tipografianpm install

```

- **Fonte**: Inter (Google Fonts)

- **Pesos**: 400, 500, 600, 700### 3a) Rodar em desenvolvimento (TypeScript com reload)



## 🚀 Deploy```powershell

npm run dev

### Vercel (Recomendado)```



Consulte o guia completo em [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)Servidor em http://localhost:3000



**Deploy rápido:**### 3b) Rodar build de produção



```bash```powershell

npm install -g vercelnpm run build

vercel --prodnpm start

``````



### Configurar Variáveis de Ambiente### 3c) Rodar a API em Docker (sem docker-compose)



No dashboard da Vercel, adicione:```powershell

# Build da imagem

- `VITE_API_URL` - URL do backend em produçãodocker build -t mini-projeto-api .

- `VITE_APP_NAME` - Nome da aplicação

# Executar container passando o .env

## 🔗 Integração com Backenddocker run --name mini-projeto-api -p 3000:3000 --env-file .env mini-projeto-api

```

Este frontend se conecta com a API REST do backend.

---

**Endpoints principais:**

## 📜 Scripts

- `POST /api/users/register` - Cadastro de usuário

- `POST /api/users/login` - Login- `npm run dev` – Inicia em desenvolvimento com ts-node-dev

- `POST /api/finances` - Criar financiamento- `npm run build` – Compila TypeScript para `dist/`

- `GET /api/finances` - Listar financiamentos- `npm start` – Executa `node dist/server.js`



**Autenticação:**---



Utiliza JWT Bearer token no header `Authorization`.## 🔎 Endpoints



## 📝 Scripts DisponíveisBase URL: `http://localhost:3000`



```bash### Saúde do servidor

npm run dev      # Servidor de desenvolvimento- `GET /` → `{ message, status }` (rota pública)

npm run build    # Build de produção

npm run preview  # Preview da build### Autenticação

npm run lint     # Linter (se configurado)- `POST /api/register`

```	- Body: `{ name: string, email: string, password: string }`

	- 200: `{ status, token, user: { id, name, email } }`

## 🤝 Contribuindo	- 400: Campos obrigatórios ausentes ou senha < 6

	- 409: Email em uso

1. Fork o projeto

2. Crie uma branch: `git checkout -b feature/nova-feature`- `POST /api/login`

3. Commit: `git commit -m 'feat: adiciona nova feature'`	- Body: `{ email: string, password: string }`

4. Push: `git push origin feature/nova-feature`	- 200: `{ status, token, user: { id, name, email } }`

5. Abra um Pull Request	- 401: Credenciais inválidas



## 📄 Licença### Rota protegida (exemplo)

- `GET /api/protected`

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.	- Header: `Authorization: Bearer <TOKEN>`

	- 200: `{ message: '✅ Acesso autorizado.' }`

## 👤 Autor	- 401: Token ausente/inválido



**Guilherme Rios**### Tarefas (todas exigem JWT via `Authorization: Bearer <TOKEN>`) 



- GitHub: [@guilhermerios21](https://github.com/guilhermerios21)- `POST /api/tasks`

	- Body: `{ title: string, description?: string, userId: string }`

## 🙏 Agradecimentos	- Observação: use no `userId` o mesmo `id` do usuário autenticado.

	- 201: `{ status: 201, task }`

- Design inspirado em interfaces modernas de fintech	- 403: Usuário inválido

- Comunidade React e Vite por ferramentas incríveis	- 500: Erro ao criar

- TailwindCSS pela produtividade no CSS

- `GET /api/tasks`

---	- Query opcional: `title`, `description`, `completed`

	- 200: `{ status: 200, tasks }` (somente `deleted: false`)

⭐ Se este projeto te ajudou, considere dar uma estrela!	- 404: Nenhuma tarefa encontrada


- `GET /api/tasks/:id`
	- 200: `{ status: 200, task }`
	- 403/404: Acesso negado ou não encontrada

- `PUT /api/tasks/:id`
	- Atualização total – exige todos os campos: `{ title, description, completed }`
	- Proíbe alterar `userId`
	- 200: `{ status: 200, task }`
	- 400/403/404 conforme validações

- `PATCH /api/tasks/:id`
	- Atualização parcial – exige ao menos um de `{ title, description, completed }`
	- 200: `{ status: 200, task }`
	- 400/403/404 conforme validações

- `DELETE /api/tasks/:id`
	- Soft delete (`deleted = true`)
	- 200: `{ status: 200, message: 'Tarefa deletada com sucesso.' }`
	- 403/404: Usuário inválido ou tarefa não encontrada

- `PATCH /api/tasks/:id/restore`
	- Restaura uma tarefa deletada (`deleted = false`)
	- 200: `{ status: 200, message: 'Tarefa restaurada com sucesso.' }`
	- 400: A tarefa não estava deletada
	- 403/404: Usuário inválido ou tarefa não encontrada

---

## 🧪 Testes rápidos (curl)

Substitua `<TOKEN>` pelo token retornado no login.

```powershell
# Registro
curl -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d '{"name":"Alice","email":"alice@example.com","password":"SenhaForte123"}'

# Login
curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"email":"alice@example.com","password":"SenhaForte123"}'

# Acesso protegido
curl http://localhost:3000/api/protected -H "Authorization: Bearer <TOKEN>"

# Criar tarefa
curl -X POST http://localhost:3000/api/tasks -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"title":"Tarefa 1","description":"Teste","userId":"<USER_ID>"}'

# Listar tarefas
curl http://localhost:3000/api/tasks -H "Authorization: Bearer <TOKEN>"
```

---

## 📦 Coleção Postman

Há uma coleção pronta em `requests/resquests.yml` com cenários de cadastro, login, rota protegida e tarefas (incluindo filtros e erros comuns).

---

## 🔧 Dicas e Solução de Problemas

- Verifique se o `.env` está correto e carregado antes de iniciar.
- Se usar o `docker-compose`, confira se o Mongo está rodando: `docker ps`.
- Para conectar no Mongo local com auth: use `...@localhost:27017/<database>?authSource=admin`.
- Express 5 está em uso; middlewares e handlers já seguem a tipagem atual.

---

## 📄 Licença

ISC — veja `LICENSE`.

---

## 🙌 Créditos

Autor: Miguel Bernardino


# ⚙️ Instalação de Dependências

Este guia descreve apenas os passos para instalar as dependências necessárias do projeto **Express + TypeScript**.

---

## 📦 1. Inicializar o projeto Node.js

No terminal, execute:

```bash

### instala o express 
npm install express

### adiciona o express ao ts
npm install -D typescript ts-node-dev @types/node @types/express

### instala o mongoDB 
npm install mongoose
npm install -D @types/mongoose

### instalacao do dotenv
npm install dotenv

### instalacao do bcryptjs
npm install bcryptjs
npm install --save-dev @types/bcryptjs

### instalacao do JWT
npm install jsonwebtoken
npm install -D @types/jsonwebtoken

### DOCKER

#Criar arquivo DockerFile(sem extensão) e docker-compose.yml

###Apos criar use os comandos abaixo
docker-compose up -d

###executar o comando abaixo para rodar o codigo
npm run dev
```
mini-projeto-v1:https://www.youtube.com/watch?v=mURPTHjxbvo
mini-projeto-v2:https://www.youtube.com/watch?v=47rgQUt6Y_Q
