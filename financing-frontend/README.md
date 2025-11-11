# Financing Frontend

Este projeto é um frontend para um sistema de financiamento, responsável por interagir com o backend de uma loja. A aplicação permite que os usuários solicitem financiamentos, verifiquem o status de suas solicitações e recebam confirmações.

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

```
financing-frontend
├── src
│   ├── main.tsx          # Ponto de entrada da aplicação
│   ├── App.tsx           # Componente principal que gerencia as rotas
│   ├── pages             # Páginas da aplicação
│   │   ├── Home.tsx      # Página inicial
│   │   ├── Apply.tsx     # Página para solicitar financiamento
│   │   ├── Status.tsx    # Página que exibe o status da solicitação
│   │   └── Confirmation.tsx # Página de confirmação da solicitação
│   ├── components        # Componentes reutilizáveis
│   │   ├── Header.tsx    # Cabeçalho da aplicação
│   │   ├── Footer.tsx     # Rodapé da aplicação
│   │   ├── LoanForm.tsx  # Formulário de solicitação de financiamento
│   │   ├── PaymentSchedule.tsx # Cronograma de pagamentos
│   │   └── Spinner.tsx    # Indicador de carregamento
│   ├── services          # Serviços para interagir com a API
│   │   └── api.ts        # Funções para chamadas à API
│   ├── hooks             # Hooks personalizados
│   │   └── useFetch.ts   # Hook para requisições HTTP
│   ├── store             # Configuração do estado global
│   │   └── index.ts      # Configuração do estado global
│   ├── styles            # Estilos da aplicação
│   │   └── globals.css    # Estilos globais
│   └── types             # Tipos e interfaces
│       └── index.ts      # Tipos utilizados na aplicação
├── public
│   └── index.html        # Template HTML principal
├── package.json          # Configuração do npm
├── tsconfig.json         # Configuração do TypeScript
├── vite.config.ts        # Configuração do Vite
└── README.md             # Documentação do projeto
```

## Instalação

Para instalar as dependências do projeto, execute:

```
npm install
```

## Execução

Para iniciar a aplicação em modo de desenvolvimento, utilize:

```
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, faça um fork do repositório e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License.