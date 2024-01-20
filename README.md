# 🚀 Fast develop logger.

## 🌱 First steps

```bash
npm install -g dotenv-cli
```

## 🚀 Start on production

```bash
docker-compose --env-file .env.production --profile production -f docker-compose-base.yml -f docker-compose-prod.yml up --build
```

## 🚧 Start on staging

```bash
docker-compose --env-file .env.staging --profile staging -f docker-compose-base.yml -f docker-compose-stage.yml up --build
```

## 💻 Start on development

```bash
docker-compose --env-file .env.development --profile development -f docker-compose-base.yml -f docker-compose-dev.yml up --build
```

<br>

## 1. Local development

#### 1.1. Local development via local database

- Install Postgres database in local machine with settings in `.env.local`.
- Run run:

```bash
dotenv -e .env.local -- npx node-pg-migrate up
yarn start:local
```

#### 1.2. Local development via docker database

- Use this command to set up with Docker:

```bash
docker-compose --env-file .env.local -f docker-compose-base.yml -f docker-compose-local.yml up --build
```

- Then run:

```bash
dotenv -e .env.local -- npx node-pg-migrate up
yarn start:local
```

<br>

## 2. Testing

#### 2.1. Testing via local database

- Install Postgres database in local machine with settings in `.env.testing`.
- Then run:

```bash
dotenv -e .env.testing -- npx node-pg-migrate up
yarn test:e2e
```

#### 2.2. Testing via docker

- Set up using Docker:

```bash
docker-compose --env-file .env.testing -f docker-compose-base.yml -f docker-compose-test.yml up --build
```

- Then run:

```bash
dotenv -e .env.testing -- npx node-pg-migrate up
yarn test:e2e
```

<br>

## 📋 Possible issues

- error database "db-name" does not exist - [Solution in stackoverflow](https://stackoverflow.com/questions/48629799/postgres-image-is-not-creating-database)

## 📋 TODO

- Testing
- Queue Server batching
