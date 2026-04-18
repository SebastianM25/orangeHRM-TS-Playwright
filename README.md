# orangeHRM-TS-Playwright-

## Run tests in GitHub Actions

The project includes a GitHub Actions workflow at `.github/workflows/playwright.yml`.

It runs automatically on:
- push to `main` or `master`
- every pull request
- manual trigger from the `Actions` tab via `workflow_dispatch`

Default execution uses the OrangeHRM public demo:
- `BASE_URL=https://opensource-demo.orangehrmlive.com`
- `ORANGE_USERNAME=Admin`
- `ORANGE_PASSWORD=admin123`

If you want to run against another environment, add these repository secrets in GitHub:
- `BASE_URL`
- `LOGIN_PATH`
- `DASHBOARD_PATH`
- `ORANGE_USERNAME`
- `ORANGE_PASSWORD`

After each run, GitHub Actions uploads:
- `playwright-report`
- `test-results`

## Run tests with Docker

1. Create `.env` from `.env.example` and set credentials.
2. Build the Docker image:
   - `npm run docker:build`
3. Run all tests in Docker:
   - `npm run docker:test`
4. Run only login test in Docker:
   - `npm run docker:test:login`

For any specific test file, use:
- `docker run --rm --env-file .env orangehrm-playwright npx playwright test tests/<file>.spec.ts`

## Optional: Makefile shortcuts

- `make build` - build Docker image
- `make build-fresh` - build Docker image without cache
- `make test` - run all tests
- `make test-login` - run only login test
- `make test-file TEST=tests/<file>.spec.ts` - run a specific test file

## Git Hooks

This repo includes a tracked `pre-commit` hook in `.githooks/pre-commit`.

Enable it once in your local clone:
- `git config core.hooksPath .githooks`

After that, `git commit` will run `npx playwright test` before the commit is created.
