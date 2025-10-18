# Agents Overview

## Context
- **Primary languages:** TypeScript
- **Frameworks & libraries:** Remix, React, Cloudflare Pages, Nanostores, Framer Motion, Shiki (for code highlighting), Codemirror (editor), Xterm.js (terminal), ai/react (AI integration), ai-sdk/anthropic (Anthropic AI SDK), WebContainer API.
- **Services / external APIs:**
    *   Cloudflare Pages (for deployment and hosting)
    *   LLM services (e.g., Anthropic, inferred from `@ai-sdk/anthropic` and `app/lib/.server/llm/`)
    *   The core technology's in-browser development environment API (WebContainer API)
    *   Persistence layer (inferred from `app/lib/persistence/db.ts`)
- **Entry points:**
    *   **HTTP:**
        *   `app/entry.server.tsx` (Remix server entry)
        *   `app/routes/_index.tsx` (main application route)
        *   `app/routes/api.chat.ts` (API endpoint for chat interactions)
        *   `app/routes/api.enhancer.ts` (API endpoint for prompt enhancement)
        *   `app/routes/chat.$id.tsx` (dynamic chat session route)
    *   **CLI:**
        *   `pnpm run dev` (local development server)
        *   `pnpm run build` (build for production)
        *   `pnpm run deploy` (deployment to Cloudflare Pages)
        *   `pnpm run start` (local preview of production build)
        *   `pnpm run test` (run tests)
        *   `pnpm run typecheck` (type checking)
        *   `pnpm run lint` (code linting)
        *   `pnpm run typegen` (Cloudflare Worker type generation)
    *   **Jobs:** Not detected

## Proposed Agents
### 1) Codebase Navigator
- **Goal:** Answer questions about modules, flows, and configs.
- **Inputs:** Source tree, manifests, docs
- **Tools:** File reader, code search, dependency graph
- **Risks:** Leakage of secrets → enforce denylist + size limits

### 2) Issue Triage Agent
- **Goal:** Summarize new issues/PRs, label, suggest owners
- **Signals:** File paths, commit history, CODEOWNERS
- **Tools:** Git metadata, labeler

### 3) Runbook Generator
- **Goal:** Produce quickstart and ops steps from scripts/Dockerfiles
- **Tools:** Script parser, Dockerfile inspector

## Prompts & Policies
- **System prompt:** Be precise, cite files where appropriate, and never reveal secrets or proprietary information.
- **PII/Secret policy:** Redact all secrets, API keys, and personally identifiable information.
- **Redaction:** Project name, organization, and internal hosts must be replaced with "<redacted>".

## Environment & Setup
- **Required env vars:**
    *   Environment variables passed via `./bindings.sh` script (inferred from `start` script).
    *   Potentially `.env` files (inferred from `.gitignore`).
    *   API keys for LLM services (`app/lib/.server/llm/api-key.ts`).
- **Start commands:**
    *   For development: `pnpm run dev`
    *   For production-like local preview: `pnpm run start`
- **Test commands:** `pnpm run test`

## Observability Hooks
- **Logs:**
    *   `app/utils/logger.ts` for structured application logging.
    *   Standard console output.
    *   Log files (inferred from `.gitignore` entries `logs`, `*.log`).
- **Health checks:** Not explicitly detected from routes or dedicated files.

## Known Gaps
- Large binaries and non-code assets are ignored.
- Analysis is based on a limited number of files.
- License files are kept separate and not modified.

## Developer Guide
- **Setup**:
    1.  Ensure Node.js version `20.15.1` (or compatible >=18.18.0) and pnpm `9.4.0` are installed (inferred from `.tool-versions` and `packageManager`).
    2.  Install dependencies: `pnpm install`
- **Running the project**:
    *   For development with live-reloading: `pnpm run dev`
    *   For a local preview of the production build: `pnpm run preview`
- **Adding dependencies**: Use `pnpm add <package-name>` for production dependencies or `pnpm add -D <package-name>` for development dependencies.

## Testing Guidelines
- **Running tests**:
    *   Run all tests once: `pnpm run test`
    *   Run tests in watch mode: `pnpm run test:watch`
- **Test location**: Tests are located alongside the source code, typically in `.spec.ts` files (e.g., `app/lib/runtime/message-parser.spec.ts`).
- **Frameworks**: Vitest
- **AI-assisted Development**: Given this project's nature as an AI-powered agent, leveraging generative AI (e.g., Gemini) for brainstorming, code generation, and review is highly encouraged.

## Contribution Process
- **PR Title Format**: Follow the Conventional Commits specification. Titles should start with a type (e.g., `feat`, `fix`, `chore`, `build`, `ci`, `perf`, `docs`, `refactor`, `revert`, `test`), optionally followed by a scope, and then a subject line that *does not* start with an uppercase character. Example: `feat(chat): improve message display`.
- **Pre-commit checks**:
    *   Validate commit message format (via Husky and Commitlint).
    *   Run type checking: `pnpm run typecheck`
    *   Run code linting: `pnpm run lint` (or `pnpm run lint:fix` to automatically fix issues)
    *   Run all tests: `pnpm run test`
