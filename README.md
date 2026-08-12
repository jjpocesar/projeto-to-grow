# Projeto To Grow

API em ASP.NET Core (.NET 9) para cadastro de Pessoas e Cargos, com autenticação JWT, e um front-end em React (Vite) para consumir essa API.

## Estrutura do repositório

```
.
├── Controllers/        Endpoints da API (Auth, Pessoas, Cargos)
├── Services/            Regras de negócio
├── Repositories/        Acesso a dados (padrão Repository)
├── Models/               Entidades (Pessoa, Cargo, User)
├── Dtos/                 Objetos de entrada/saída da API
├── Context/              AppDbContext e seed inicial do banco
├── Migrations/           Migrations do Entity Framework Core
├── appsettings.Example.json   Modelo de configuração (sem segredos)
└── frontend/              Aplicação React (Vite)
```

## Pré-requisitos

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) 18 ou superior
- MySQL ou MariaDB rodando localmente (ou acessível pela rede)
- Ferramenta `dotnet-ef` (instalação abaixo)

## Backend (API)

1. Restaure os pacotes:

   ```bash
   dotnet restore
   ```

2. Crie o arquivo de configuração local a partir do modelo (esse arquivo **não** é versionado, pois contém suas credenciais):

   ```bash
   # Windows (PowerShell)
   Copy-Item appsettings.Example.json appsettings.json

   # Linux/macOS
   cp appsettings.Example.json appsettings.json
   ```

3. Edite `appsettings.json` e preencha com seus dados:
   - `ConnectionStrings:DefaultConnection`: troque `SUA_SENHA_AQUI` pela senha do seu MySQL.
   - `Jwt:Key`: troque pelo valor de exemplo por uma chave secreta própria (uma string longa e aleatória). Nunca reutilize a chave de exemplo em produção.

4. Instale a ferramenta de migrations do EF Core (se ainda não tiver):

   ```bash
   dotnet tool install --global dotnet-ef
   ```

5. Crie o banco de dados e as tabelas a partir das migrations:

   ```bash
   dotnet ef database update
   ```

6. Rode a API:

   ```bash
   dotnet run
   ```

   Por padrão a API sobe em `http://localhost:5000`. Na primeira execução, um cargo padrão chamado **Colaborador** é criado automaticamente no banco (veja `Context/DbSeeder.cs`).

### Endpoints principais

| Método | Rota                  | Descrição                          | Autenticação |
|--------|------------------------|--------------------------------------|--------------|
| POST   | `/api/auth/register`  | Cria um usuário                      | Não          |
| POST   | `/api/auth/login`     | Autentica e retorna um token JWT     | Não          |
| GET    | `/api/pessoas`         | Lista pessoas                        | Sim          |
| GET    | `/api/pessoas/{id}`   | Busca uma pessoa                     | Sim          |
| POST   | `/api/pessoas`         | Cadastra uma pessoa                  | Sim          |
| PUT    | `/api/pessoas/{id}`   | Atualiza uma pessoa                  | Sim          |
| DELETE | `/api/pessoas/{id}`   | Remove uma pessoa                    | Sim          |
| GET    | `/api/cargos`          | Lista cargos                         | Sim          |
| GET    | `/api/cargos/{id}`    | Busca um cargo                       | Sim          |
| POST   | `/api/cargos`          | Cadastra um cargo                    | Sim          |
| PUT    | `/api/cargos/{id}`    | Atualiza um cargo                    | Sim          |
| DELETE | `/api/cargos/{id}`    | Remove um cargo                      | Sim          |

As rotas autenticadas exigem o header `Authorization: Bearer <token>`, obtido no login.

## Frontend

O front-end fica na pasta `frontend/` e é uma SPA em React (Vite, JavaScript puro, sem TypeScript).

1. Entre na pasta do front-end:

   ```bash
   cd frontend
   ```

2. Crie o arquivo de variáveis de ambiente local a partir do modelo:

   ```bash
   # Windows (PowerShell)
   Copy-Item .env.example .env

   # Linux/macOS
   cp .env.example .env
   ```

   Ajuste `VITE_API_URL` se a API estiver rodando em outro endereço.

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Rode em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

   Por padrão o front-end sobe em `http://localhost:5173`.

## Fluxo de uso

1. Registre um usuário (pela tela de registro do front-end ou via `POST /api/auth/register`).
2. Faça login para obter o token JWT (guardado automaticamente pelo front-end).
3. Cadastre cargos e pessoas pela tela inicial. Um cargo padrão ("Colaborador") já é criado automaticamente no banco.

## Segurança

- `appsettings.json` (com a senha real do banco e a chave JWT) e o `.env` do front-end **não** devem ser commitados — ambos já estão no `.gitignore`. Use `appsettings.Example.json` e `frontend/.env.example` como modelo.
- Nunca reutilize a chave JWT de exemplo em um ambiente real.

## Tecnologias

- **Backend:** .NET 9, ASP.NET Core Web API, Entity Framework Core, Pomelo.EntityFrameworkCore.MySql, autenticação JWT.
- **Frontend:** React 19, Vite, React Router.
- **Banco de dados:** MySQL/MariaDB.
