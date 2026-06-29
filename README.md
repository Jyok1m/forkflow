# forkflow-api

NestJS + GraphQL API backed by PostgreSQL (Prisma).

## Requirements

- Node.js 22+
- pnpm
- Docker (for PostgreSQL)

## Setup

Install dependencies:

```bash
pnpm install
```

Create a `.env` file:

```
POSTGRES_USER=forkflow
POSTGRES_PASSWORD=forkflow
POSTGRES_DB=forkflow-api
DATABASE_URL=postgresql://forkflow:forkflow@localhost:5432/forkflow-api
```

Start the database:

```bash
docker compose up -d
```

Run migrations:

```bash
pnpm prisma migrate dev
```

## Run

```bash
pnpm start:dev
```

## Other commands

```bash
pnpm test            # unit tests
pnpm prisma db seed  # seed the database
```

Adminer (database UI) is available at http://localhost:8080.
