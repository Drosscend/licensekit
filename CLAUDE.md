# CLAUDE.md -- Project Instructions for Claude

## Project Overview

**LicenseKit** is an interactive CLI tool built in TypeScript that helps developers choose, understand, and add open-source licenses to their projects. It combines a guided wizard, detailed license explanations, and seamless LICENSE file generation -- all from the terminal.

The tool generates a plain text `LICENSE` file and can optionally update the `license` field in detected manifests (e.g., `package.json`). It does not generate headers or produce markdown output.

## Tech Stack

- **Runtime**: Bun (>=1.0)
- **Language**: TypeScript (strict mode enabled)
- **Package manager**: bun
- **Build tool**: bun build (native bundler)
- **Linting & Formatting**: Biome.js
- **Testing**: bun test (built-in test runner)

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `@clack/prompts` | Interactive CLI prompts (modern UI inspired by clack) |
| `commander` | CLI argument parsing and flags |
| `picocolors` | Terminal colors (lightweight alternative to chalk) |

## Data Sources

- **GitHub Licenses API** (`https://api.github.com/licenses`) -- License text, description, permissions, conditions, limitations. No auth required.
- **choosealicense.com** (`github/choosealicense.com` repo, `_licenses/` directory) -- YAML front matter with structured metadata per license.
- **SPDX License List** (`spdx/license-list-data` repo, `json/` directory) -- Complete license identifiers and texts.

For offline support, the most common licenses (MIT, Apache-2.0, GPL-3.0, etc.) are bundled as embedded data in `src/data/licenses/`.

## Project Structure

```
licensekit/
├── src/
│   ├── index.ts                  # Entry point, CLI setup with commander
│   ├── commands/                  # CLI command handlers
│   │   ├── wizard.ts              # Interactive wizard flow
│   │   ├── list.ts                # List all available licenses
│   │   ├── info.ts                # Show details for a specific license
│   │   └── compare.ts             # Side-by-side license comparison
│   ├── core/                      # Core business logic
│   │   ├── license-resolver.ts    # Resolves license by ID/name
│   │   ├── license-scorer.ts      # Scores licenses based on wizard answers
│   │   ├── template-engine.ts     # Fills placeholders in license text
│   │   ├── file-writer.ts         # Writes LICENSE file to disk
│   │   └── manifest/              # Manifest detection and update
│   │       ├── index.ts           # Public API for manifest operations
│   │       ├── types.ts           # ManifestAdapter, ManifestDetection types
│   │       ├── registry.ts        # Adapter registry
│   │       └── adapters/
│   │           └── node.ts        # Node.js (package.json) adapter
│   ├── data/                      # Embedded license data
│   │   ├── licenses/              # Individual license files (JSON + index.ts)
│   │   ├── rules.ts               # Permissions, conditions, limitations definitions
│   │   └── questions.ts           # Wizard questions and scoring matrix
│   ├── i18n/                      # Internationalization
│   │   ├── index.ts               # Translation loader and interpolation
│   │   ├── keys.ts                # TranslationKeys type definition
│   │   ├── en.ts                  # English translations
│   │   └── fr.ts                  # French translations
│   ├── utils/                     # Utility functions
│   │   ├── git.ts                 # Read git config (user.name, user.email)
│   │   ├── detect-language.ts     # Auto-detect system locale
│   │   ├── format.ts              # Terminal formatting helpers
│   │   └── logo.ts               # ASCII logo renderer
│   └── types/                     # TypeScript type definitions
│       ├── license.ts             # License, LicenseMetadata, LicenseRule types
│       ├── wizard.ts              # WizardAnswer, WizardQuestion types
│       └── cli.ts                 # CLI options and command types
├── tests/                         # Test files mirroring src/ structure
├── package.json
├── tsconfig.json
├── biome.json
├── bunfig.toml
├── README.md
├── CLAUDE.md
├── CONTRIBUTING.md
└── LICENSE
```

## Coding Conventions

### General

- All code comments are written in **English**
- TypeScript **strict mode** is always enabled
- Prefer `const` over `let`, never use `var`
- Use **named exports** only (no default exports)
- Every function has explicit return types
- Every public function has a JSDoc comment
- No emojis in code, comments, or CLI output

### File Organization

- One concern per file, one export per file when possible
- Types are in dedicated `types/` subdirectories
- Utility functions are pure functions with no side effects
- Group imports: node/bun built-ins -> external deps -> internal modules (with blank lines between groups)

### Naming

- Files: `kebab-case.ts`
- Types/Interfaces: `PascalCase` (e.g., `LicenseMetadata`)
- Functions/variables: `camelCase` (e.g., `resolveLicense`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `DEFAULT_OUTPUT_PATH`)
- Enums: `PascalCase` with `PascalCase` members

### Error Handling

- Use custom error classes extending `Error` (e.g., `LicenseNotFoundError`)
- Always provide user-friendly error messages in the CLI output
- Never let unhandled promise rejections crash the process
- Wrap async operations in try/catch with proper cleanup

### Testing

- Test files are named `*.test.ts` and placed in `tests/` directory
- Use `describe` / `it` blocks with descriptive names
- Test the core logic independently from CLI I/O
- Mock file system operations and API calls in tests

## CLI Architecture

The CLI follows a **command pattern**:

1. `commander` parses arguments and routes to the appropriate command handler
2. Each command handler in `commands/` orchestrates the flow
3. Business logic lives in `core/` and is framework-agnostic
4. `@clack/prompts` handles all user interaction
5. `file-writer.ts` handles all file system operations

## Important Notes

- The tool outputs a plain text `LICENSE` file and optionally updates manifest files (e.g., `package.json` license field) -- no markdown, no source file headers
- The tool must work **offline** for bundled licenses (no network required for common licenses)
- Network requests (GitHub API) are only used for fetching less common licenses or when the user explicitly requests it
- The wizard scoring system assigns weights to user answers and ranks licenses by total score
- License texts contain placeholders like `[year]`, `[fullname]` that must be replaced
- The tool should detect and respect existing `.gitconfig` for author name/email
- All terminal output uses `picocolors` for coloring -- never use ANSI escape codes directly
- The shebang line `#!/usr/bin/env node` must be present in the entry point
- No emojis anywhere: not in CLI output, not in code, not in comments

## Build & Run Commands

```bash
# Install dependencies
bun install

# Development (watch mode)
bun --watch src/index.ts

# Build
bun build src/index.ts --outdir dist --target node

# Run locally
bun src/index.ts

# Run tests
bun test

# Lint
bun run lint

# Lint and fix
bun run lint:fix

# Format
bun run format

# Link globally for testing
bun link
```

## Release Process

After every set of modifications, **Claude must perform the release steps below** before considering the task complete. This triggers the CI pipeline (GitHub Release + npm publish).

### Steps

1. **Run checks** -- Ensure all validations pass before releasing:
   ```bash
   bun run lint && bunx tsc --noEmit && bun test
   ```
2. **Determine the version bump** -- Follow [semver](https://semver.org/):
   - `patch` (0.0.X) -- bug fixes, typo corrections, minor adjustments
   - `minor` (0.X.0) -- new features, non-breaking enhancements
   - `major` (X.0.0) -- breaking changes (API, CLI flags, output format)
3. **Bump the version** in `package.json` (update the `"version"` field).
4. **Commit all changes** (code + version bump) in a single conventional commit:
   ```
   <type>(<scope>): <description>
   ```
   Examples: `fix(core): handle undefined in license scorer`, `feat(wizard): add license comparison step`.
5. **Create an annotated git tag** matching the new version:
   ```bash
   git tag -a v<version> -m "v<version>"
   ```
6. **Push the commit and tag together**:
   ```bash
   git push && git push --tags
   ```

### Important rules

- Never skip the lint/typecheck/test step -- a broken release is worse than a delayed one.
- The tag **must** match the pattern `v*` (e.g., `v0.2.0`) to trigger the CI workflow.
- The tag version **must** match `package.json` `"version"` exactly (without the `v` prefix).
- Always push the commit **before** or **together with** the tag so CI has the code to build.
