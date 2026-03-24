# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**From the repo root (runs all packages via Turbo):**
```bash
npm run dev          # Start all dev servers in watch mode
npm run build        # Build all packages
npm run lint         # Lint all packages
npm run type-check   # TypeScript type-check all packages
```

**Per-package (cd into the directory first):**
```bash
# SDK: packages/sdk
npm run build        # Bundle with tsup (ESM + CJS + .d.ts)
npm run dev          # Watch mode
npm run type-check

# Demo app: apps/demo
npm run dev          # Vite dev server
npm run build        # tsc + vite build
```

There are no tests in this repo.

## Architecture

This is a **monorepo** (Turborepo + npm workspaces) containing:

- `packages/sdk` — The `@byte3-it/chantilly` React component library
- `packages/storage-helper-firebase` — Optional Firebase Storage integration
- `apps/demo` — Vite + React demo app that imports the SDK via path alias

### SDK internals (`packages/sdk/src/`)

The main export is `<LandingPageBuilder>`. Its internal structure:

```
LandingPageBuilder.tsx       # Top-level orchestrator; composes all panels
store/builderStore.ts        # Zustand store — all editor state lives here
components/
  Canvas/                    # Drag-and-drop editing surface (dnd-kit)
    blocks/                  # One file per block type renderer (8 types)
  Sidebar/                   # Block palette (drag sources)
  PropertiesPanel/           # Right panel for editing selected block
    editors/                 # One file per block type editor (8 types)
  FileManager/               # Image upload/browse modal
  Templates/                 # Template selection modal
  ProjectSettings/           # Project settings panel
  ui/                        # Shared primitives: Button, Input, Select, ColorPicker
export/                      # exportToHtml — produces self-contained HTML with Tailwind CDN
types/                       # TypeScript interfaces (Block, Project, FileManager, etc.)
lib/                         # blockDefaults, createCustomBlock, generateId
```

**Block types:** `heading`, `text`, `image`, `button`, `divider`, `spacer`, `countdown`, `custom`

**State flow:** All editor state (selected block, project, history) is in the Zustand `builderStore`. Components read from and dispatch to the store. The store supports undo (max 20 states via a history stack).

**Extensibility points:**
- `customBlocks` prop — inject `CustomBlockDefinition[]` to add preset blocks to the sidebar
- `templates` prop — inject `TemplateDefinition[]` to populate the templates modal
- `fileManager` prop — provide upload/list/delete callbacks for image management
- `useBuilderStore` hook — exported for host-app store access

### Demo app (`apps/demo/src/`)

`vite.config.ts` aliases `@byte3-it/chantilly` → `../../packages/sdk/src/index.ts`, so the demo always runs against local source. `App.tsx` wires up mock storage (localStorage) and mock file manager, plus example custom blocks and templates.

### Build output

`tsup` bundles the SDK to `packages/sdk/dist/` as ESM + CJS with declaration files. Firebase helper follows the same pattern. The Turbo pipeline ensures packages build before dependent apps.
