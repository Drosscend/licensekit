# Contributing to LicenseKit

Thanks for your interest in contributing to LicenseKit. This document explains how to get started, the conventions we follow, and how to submit your work.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0
- Git

### Setup

```bash
git clone https://github.com/Drosscend/licensekit.git
cd licensekit
bun install
```

### Running locally

```bash
# Start the CLI in dev mode (auto-reload on changes)
bun --watch src/index.ts

# Run the CLI once
bun src/index.ts

# Build
bun run build

# Run tests
bun test

# Lint
bun run lint

# Lint and auto-fix
bun run lint:fix

# Format
bun run format
```

## Project Structure

```
src/
  commands/     CLI command handlers (wizard, list, info, compare)
  core/         Business logic (resolver, scorer, template engine, file writer)
  data/         Embedded license data (JSON) and scoring matrix
  i18n/         Translations (English, French)
  types/        TypeScript type definitions
  utils/        Utility functions (git, language detection, formatting)
tests/          Tests mirroring the src/ structure
scripts/        Dev scripts (license data fetcher)
```

## Conventions

### Code Style

- **Language**: TypeScript with strict mode
- **Linting and formatting**: Biome.js -- run `bun run lint:fix` before committing
- **Comments**: Always in English
- **Exports**: Named exports only, no default exports
- **Functions**: Explicit return types and JSDoc on all exported functions
- **Variables**: `const` over `let`, never `var`
- **No emojis**: Not in code, comments, commit messages, or CLI output

### Naming

- Files: `kebab-case.ts`
- Types and interfaces: `PascalCase`
- Functions and variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

### Imports

Group imports in this order, separated by blank lines:

1. Node/Bun built-ins
2. External dependencies
3. Internal modules

### Testing

- Test files go in `tests/` and are named `*.test.ts`
- Use `describe` / `it` blocks with descriptive names
- Test core logic independently from CLI I/O
- Mock file system operations and API calls
- Run `bun test` before submitting

## How to Contribute

### Reporting Bugs

Open an issue with:

- A clear title describing the problem
- Steps to reproduce
- Expected behavior vs actual behavior
- Your environment (OS, Bun version)

### Suggesting Features

Open an issue with:

- A clear description of the feature
- Why it would be useful
- How you envision it working

### Submitting Code

1. Fork the repository
2. Create a branch from `main`: `git checkout -b feat/your-feature` or `git checkout -b fix/your-fix`
3. Make your changes
4. Run `bun run lint:fix` and `bun test` to make sure everything passes
5. Commit your changes following the commit conventions below
6. Push to your fork and open a Pull Request against `main`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new license to the bundled data
fix: handle missing git config gracefully
docs: update README with new CLI options
refactor: extract scoring logic to separate module
test: add tests for template engine edge cases
chore: update dependencies
```

Keep messages short (under 72 characters for the subject line) and in English.

### Adding a New License

1. Add the license key and category to the mapping in `scripts/fetch-licenses.ts`
2. Run `bun run fetch-licenses` to download the new license data
3. Import the new JSON file in `src/data/licenses/index.ts` and add it to `LICENSES` and `LICENSE_MAP`
4. Add scoring modifiers in `src/data/questions.ts` for the new license
5. Update `README.md` with the new license in the supported licenses table
6. Add tests to verify the resolver finds the new license

### Adding a New Language

1. Create a new file in `src/i18n/` (e.g., `de.ts` for German)
2. Copy the structure from `en.ts` and translate every value
3. Add the new language code to the `SupportedLanguage` type in `src/types/cli.ts`
4. Update the `getTranslations` function in `src/i18n/index.ts` to handle the new language
5. Add tests to verify the new translation has all required keys
6. Update `README.md` to mention the new language

### Adjusting Scoring

The scoring matrix is in `src/data/questions.ts`. Each wizard answer assigns points to licenses. If you think a score is off:

1. Open an issue explaining why
2. Propose new values with reasoning
3. Make sure the tests in `tests/core/license-scorer.test.ts` still pass after your changes (or update them accordingly)

## Code of Conduct

Be respectful, constructive, and inclusive. We are all here to build a useful tool. Harassment, discrimination, and unconstructive negativity have no place in this project.

## License

By contributing to LicenseKit, you agree that your contributions will be licensed under the [MIT License](LICENSE).
