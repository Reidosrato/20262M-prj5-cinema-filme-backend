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

4. Crie/atualize as tabelas do schema no banco:

   ```bash
   npx prisma db push
   ```

   Esse comando aplica `prisma/schema.prisma` diretamente no MySQL, criando as tabelas `filme`, `sala` e `sessao` e seus relacionamentos. Para um banco compartilhado ou produção, use migrações versionadas (`npm run prisma:migrate`) em vez de alterar o schema diretamente.

5. Inicie a API:

   ```bash
   npm run start:dev
   ```

A API local fica em `http://localhost:3000`. Não compartilhe o arquivo `.env`, pois ele pode conter a senha do banco.

## Docker

É necessário ter Docker Engine e Docker Compose v2 instalados. Configure `DATABASE_URL` com uma URL MySQL acessível a partir do container e execute:

```powershell
$env:DATABASE_URL = "mysql://usuario:senha@host-do-mysql:3306/nome_do_banco"
docker compose up --build
```

A API ficará disponível em `http://localhost:3000`. Para um banco MySQL rodando no computador host, não use `localhost` na URL dentro do container: use um endereço acessível pelo Docker, como `host.docker.internal` quando suportado. O Compose verifica a disponibilidade HTTP da API; ele não cria nem migra tabelas.

O Dockerfile usa build multi-stage, executa o processo como usuário sem privilégios e gera o Prisma Client durante o build. A URL fictícia usada nessa geração não é uma credencial e não é usada para conectar ao banco. O `.dockerignore` impede que `.env`, `.git`, `node_modules` e `dist` sejam enviados para o build.

## Jenkins

O [Jenkinsfile](./Jenkinsfile) valida o schema, executa lint e build, constrói a imagem e faz deploy quando a branch é `main`. O deploy ocorre no Docker Engine acessível pelo agente Jenkins; não há publicação em registry.

Pré-requisitos do agente:

- Linux com Node.js 22+, npm, Docker Engine e Docker Compose v2;
- permissão para executar comandos Docker;
- credencial do tipo **Secret text** com ID `cinema-database-url`, cujo conteúdo é a URL MySQL completa.

Configure o Jenkins como pipeline multibranch (ou disponibilize `BRANCH_NAME`/`GIT_BRANCH`) para que o deploy seja restrito à branch principal. Configure também a rede/firewall para que o container alcance o servidor MySQL. O pipeline não executa `prisma db push` nem migrações no banco.

## Rotas

Use `http://localhost:3000` como endereço base:

- `GET /filmes` - ver todos os filmes
- `GET /filmes/:id` - buscar um filme
- `POST /filmes` - cadastrar um filme
- `PATCH /filmes/:id` - atualizar um filme
- `DELETE /filmes/:id` - apagar um filme
- `GET /salas` e `GET /salas/:id` - consultar salas
- `POST /salas`, `PATCH /salas/:id` e `DELETE /salas/:id` - gerenciar salas
- `GET /sessoes` e `GET /sessoes/:id` - consultar sessões
- `POST /sessoes`, `PATCH /sessoes/:id` e `DELETE /sessoes/:id` - gerenciar sessões

No cadastro, envie `status` como número inteiro. O serviço também tem um endereço público pelo Gateway: `http://academico3.rj.senac.br/cinema/filmes`. O caminho completo das rotas públicas depende de como o Gateway está configurado.

O cadastro de sala recebe `nome`, `capacidade`, `tipoSala` (`2D`, `3D` ou `IMAX`) e `status`. O cadastro de sessão recebe `filmeId`, `salaId`, `dataHoraInicio`, `dataHoraFim` e `status`; filme e sala precisam existir.

## Exemplos de cadastro

Os exemplos abaixo usam `curl.exe` no Windows e criam os registros na ordem necessária: filme, sala e sessão. Troque as datas e os valores conforme necessário.

### Cadastrar filme

```powershell
curl.exe -X POST http://localhost:3000/filmes `
  -H "Content-Type: application/json" `
  -d '{"titulo":"Meu filme","sinopse":"Uma sinopse","classificacao":"Livre","duracaoMinutos":110,"genero":"Drama","idioma":"Português","dataLancamento":"2026-01-15T00:00:00.000Z","trailer":"https://example.com/trailer","status":1}'
```

### Cadastrar sala

```powershell
curl.exe -X POST http://localhost:3000/salas `
  -H "Content-Type: application/json" `
  -d '{"nome":"Sala 1","capacidade":120,"tipoSala":"2D","status":1}'
```

### Cadastrar sessão

Use os IDs retornados pelas chamadas anteriores em `filmeId` e `salaId`.

```powershell
curl.exe -X POST http://localhost:3000/sessoes `
  -H "Content-Type: application/json" `
  -d '{"filmeId":1,"salaId":1,"dataHoraInicio":"2026-01-15T19:00:00.000Z","dataHoraFim":"2026-01-15T20:50:00.000Z","status":1}'
```

Sessões referenciam filme e sala existentes. Não é possível excluir um filme ou sala enquanto houver sessões vinculadas.
