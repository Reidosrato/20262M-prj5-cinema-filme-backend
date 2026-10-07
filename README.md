# 20262M-prj5-cinema-filme-backend
# API de filmes

Projeto de uma API para cadastrar e consultar filmes. Foi feito com NestJS, Prisma e MySQL.

## Como rodar

Precisa ter Node.js 22 ou superior e acesso a um banco MySQL.

1. Instale as dependências:

   ```bash
   npm ci
   ```

2. Copie `.env.example` para `.env` e coloque os dados do seu banco em `DATABASE_URL`.

   No Windows:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Gere o Prisma Client:

   ```bash
   npm run prisma:generate
   ```

4. Inicie a API:

   ```bash
   npm run start:dev
   ```

A API local fica em `http://localhost:3000`. Não compartilhe o arquivo `.env`, pois ele pode conter a senha do banco.

## Rotas

Use `http://localhost:3000` como endereço base:

- `GET /filmes` - ver todos os filmes
- `GET /filmes/:id` - buscar um filme
- `POST /filmes` - cadastrar um filme
- `PATCH /filmes/:id` - atualizar um filme
- `DELETE /filmes/:id` - apagar um filme

No cadastro, envie `status` como número inteiro. O serviço também tem um endereço público pelo Gateway: `http://academico3.rj.senac.br/cinema/filmes`. O caminho completo das rotas públicas depende de como o Gateway está configurado.
