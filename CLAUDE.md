# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install      # 安装依赖 (必须使用 pnpm)
pnpm lint:fix     # Lint 并自动修复
pnpm typecheck    # 类型检查
```

```

## Technical Stack

- **Runtime:** Node.js >= 22.0.0
- **Package Manager:** pnpm 10.27.0 (enforced via preinstall hook)
- **Language:** TypeScript (ES2022, strict mode)
- **Linting:** ESLint with @antfu/eslint-config
- **Commits:** Conventional commits enforced via commitlint
- **RSS:** RSSHub (作为库使用)

## Path Aliases

- `@/` maps to `./src/`

## Code Style

ESLint rules follow @antfu/eslint-config with these overrides:
- `no-console`: allowed
- `no-new`: allowed
- `regexp/no-unused-capturing-group`: allowed
