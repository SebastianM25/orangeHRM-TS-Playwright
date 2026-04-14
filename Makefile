IMAGE_NAME ?= orangehrm-playwright
ENV_FILE ?= .env
TEST ?= tests/login.spec.ts

.PHONY: help build build-fresh test test-login test-file

help:
	@echo "Available commands:"
	@echo "  make build        - Build Docker image"
	@echo "  make build-fresh  - Build Docker image without cache"
	@echo "  make test         - Run all Playwright tests in Docker"
	@echo "  make test-login   - Run login test in Docker"
	@echo "  make test-file TEST=tests/<file>.spec.ts - Run a specific test file"

build:
	docker build -t $(IMAGE_NAME) .

build-fresh:
	docker build --no-cache -t $(IMAGE_NAME) .

test:
	docker run --rm --env-file $(ENV_FILE) $(IMAGE_NAME) npx playwright test

test-login:
	docker run --rm --env-file $(ENV_FILE) $(IMAGE_NAME) npx playwright test tests/login.spec.ts

test-file:
	docker run --rm --env-file $(ENV_FILE) $(IMAGE_NAME) npx playwright test $(TEST)
