# AGENTS

This file provides guidance for automated agents working in this repository.

## General Guidelines
- Ensure the working directory is clean before starting.
- When modifying code or documentation, run `npm run lint` to verify style and formatting.
- If tests are available, run them before committing changes.
- Write clear commit messages in English.
- Keep changes focused and incremental.

## Project Notes
- This project uses Node.js (>=22) and Vue.js.
- Use `npm install` to add dependencies and update `package-lock.json` when needed.
- Build the project with `npm run build` to verify production readiness.
- Run `npm run seo-check` to audit SEO metadata across locales.

## 1) Environment invariants

- Use exactly:
  - `node -v` → `v22.19.0`
  - `npm -v` → `11.4.2`
- **DevDependencies must be installed** (required for `vue-cli-service`).