# How to Run

## Prerequisites

- Node.js 24
- Docker with Docker Compose

## Local execution

```bash
npm ci
cp .env.example .env
docker compose up -d --wait
npm test
docker compose down --volumes
```

Set `SECURITY_QUESTION` to `Your favorite book?` and use any disposable value for `SECURITY_QUESTION_ANSWER`.

Run only one layer with `npm run test:api` or `npm run test:e2e`.

## CI execution

GitHub Actions runs both quality gates on pull requests and pushes to `main`. A manual run can select `all`, `api`, or `e2e`.
