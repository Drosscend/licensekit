# LicenseKit

The interactive CLI tool that helps you choose, understand, and add the right license to your project.

LicenseKit goes beyond existing tools by providing clear explanations, a guided wizard, and a seamless experience -- all from your terminal.

## Features

### Interactive Wizard Mode

- Guided questionnaire to help you find the perfect license based on your needs
- Questions about your project type, commercial use, patent grants, copyleft preferences, etc.
- Smart filtering that narrows down licenses based on your answers
- Recommended licenses ranked by relevance to your use case

### License Explorer

- Browse all available open-source licenses from an interactive list
- Search and filter licenses by name or keyword
- Detailed view for each license showing:
  - **Description** -- What the license is about in plain language
  - **Permissions** -- What others can do (commercial use, modification, distribution, etc.)
  - **Conditions** -- What is required (copyright notice, state changes, same license, etc.)
  - **Limitations** -- What is excluded (liability, warranty, patent use, etc.)
- Side-by-side comparison of two licenses

### License Generation

- Automatically creates a `LICENSE` file (plain text) in your project root
- Interactive prompts to fill in placeholders (author name, year)
- Auto-detection of author name from Git config (`user.name`) and current year
- Detects manifest files (e.g., `package.json`) and offers to update the `license` field
- Support for custom output path (`--output`, `-o`)
- Confirmation prompt before overwriting an existing LICENSE file

### Internationalization (i18n)

- License explanations available in English and French
- Extensible to other languages via locale files
- Auto-detect system language or specify with `--lang`

## Installation

```bash
# Run directly with npx (no install needed)
npx @drosscend/licensekit

# Or with bunx
bunx @drosscend/licensekit

# Or install globally
npm install -g @drosscend/licensekit
bun add -g @drosscend/licensekit
```

## Usage

```bash
licensekit
```

Launches the interactive wizard that guides you through the license selection process.

### Options

| Flag | Short | Description |
|------|-------|-------------|
| `--author` | `-a` | Author name for the license |
| `--year` | `-y` | Year for the license (default: current year) |
| `--output` | `-o` | Output file path (default: `./LICENSE`) |
| `--lang` | `-l` | Language for descriptions: `en` or `fr` (default: auto-detect) |
| `--help` | `-h` | Show help |
| `--version` | `-v` | Show version |

## Preview

```
+  LicenseKit -- Choose the right license for your project
|
o  What type of project is this?
|  > Open source library
|    Personal/hobby project
|    Commercial/proprietary
|    Documentation/content
|
o  Do you want to allow commercial use?
|  > Yes
|    No
|
o  Should modifications be shared under the same license?
|  > No (permissive)
|    Yes (copyleft)
|    Only for library usage (weak copyleft)
|
-  Based on your answers, here are the recommended licenses:
|
|  1. MIT License -- Simple and permissive
|     [+] Commercial use  [+] Modification  [+] Distribution
|     [i] Include copyright  [!] No liability
|
|  2. Apache License 2.0 -- Permissive with patent protection
|     [+] Commercial use  [+] Modification  [+] Patent use
|     [i] Include copyright  [i] State changes  [!] No trademark
|
o  Which license do you want to use?
|  > MIT License
|
o  Author name:
|  Kevin Veronesi (from git config)
|
o  Year:
|  2026
|
+  Done: LICENSE file created successfully!
```

## Supported Licenses

LicenseKit supports the most commonly used open-source licenses, sourced from the GitHub Licenses API and choosealicense.com:

| License | SPDX Identifier | Type |
|---------|-----------------|------|
| MIT License | `MIT` | Permissive |
| Apache License 2.0 | `Apache-2.0` | Permissive |
| GNU GPLv3 | `GPL-3.0` | Copyleft |
| GNU GPLv2 | `GPL-2.0` | Copyleft |
| GNU AGPLv3 | `AGPL-3.0` | Copyleft |
| GNU LGPLv3 | `LGPL-3.0` | Weak Copyleft |
| Mozilla Public License 2.0 | `MPL-2.0` | Weak Copyleft |
| BSD 2-Clause | `BSD-2-Clause` | Permissive |
| BSD 3-Clause | `BSD-3-Clause` | Permissive |
| ISC License | `ISC` | Permissive |
| The Unlicense | `Unlicense` | Public Domain |
| Creative Commons Zero v1.0 | `CC0-1.0` | Public Domain |
| Boost Software License 1.0 | `BSL-1.0` | Permissive |
| Eclipse Public License 2.0 | `EPL-2.0` | Weak Copyleft |

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the [MIT License](LICENSE).
