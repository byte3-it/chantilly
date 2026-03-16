# Landing Page Builder

A visual drag-and-drop landing page builder for React. Drop it into your app, wire up save/load, and get a full page editor with HTML export.

## Install

```bash
npm install @byte3-it/landing-page-builder
```

React 18+ is required as a peer dependency.

## Quick start

```tsx
import { LandingPageBuilder } from '@byte3-it/landing-page-builder'
import type { Project } from '@byte3-it/landing-page-builder'

export default function App() {
  return (
    <LandingPageBuilder
      onSave={(project) => {
        // persist however you like
        localStorage.setItem('project', JSON.stringify(project))
      }}
    />
  )
}
```

To restore a saved project on load, pass it via `initialProject`:

```tsx
const saved = localStorage.getItem('project')

<LandingPageBuilder
  initialProject={saved ? JSON.parse(saved) : undefined}
  onSave={...}
/>
```

## Props

| Prop | Type | Description |
|---|---|---|
| `initialProject` | `Project` | Project to load on mount |
| `onSave` | `(project: Project) => void \| Promise<void>` | Called when the user clicks Save |
| `fileManager` | `FileManagerConfig` | Enables the image library modal |
| `customBlocks` | `CustomBlockDefinition[]` | Extra blocks shown at the top of the sidebar |
| `templates` | `TemplateDefinition[]` | Starting-point projects shown in the Templates modal |

## Exporting HTML

The builder does not include an export button — call `exportToHtml` yourself, for example inside `onSave`:

```tsx
import { exportToHtml } from '@byte3-it/landing-page-builder'

onSave={(project) => {
  const html = exportToHtml(project)
  // upload, download, or store the HTML string
}}
```

The output is a self-contained HTML file that loads Tailwind CSS from CDN.

## File manager

Provide a `FileManagerConfig` to enable the image picker inside the Image block editor:

```tsx
import type { FileManagerConfig } from '@byte3-it/landing-page-builder'

const fileManager: FileManagerConfig = {
  listImages:  async ()       => [...],          // return ImageFile[]
  uploadImage: async (file)   => ({ id, url, name }),
  deleteImage: async (id)     => {},
}

<LandingPageBuilder fileManager={fileManager} />
```

## Custom blocks

Register your own block presets — they appear in a dedicated section at the top of the sidebar:

```tsx
import type { CustomBlockDefinition } from '@byte3-it/landing-page-builder'
import { Zap } from 'lucide-react'

const customBlocks: CustomBlockDefinition[] = [
  {
    id: 'cta',
    label: 'CTA Button',
    icon: <Zap size={16} />,
    elementType: 'button',        // 'button' | 'link'
    defaults: {
      label: 'Get Started',
      href: '/signup',
      variant: 'primary',
      size: 'lg',
      textAlign: 'text-center',
      // any extra metadata you want stored on the block
      trackingId: 'hero-cta',
    },
  },
]

<LandingPageBuilder customBlocks={customBlocks} />
```

## Templates

Supply starting-point projects that users can pick from the Templates modal:

```tsx
import type { TemplateDefinition } from '@byte3-it/landing-page-builder'

const templates: TemplateDefinition[] = [
  {
    id: 'saas',
    name: 'SaaS Landing',
    description: 'Hero, features, and CTA.',
    thumbnail: 'https://...', // optional preview image
    project: { ... },         // full Project object
  },
]

<LandingPageBuilder templates={templates} />
```

## Reading store state

`useBuilderStore` is exported for cases where you need to read or react to builder state outside the component tree:

```tsx
import { useBuilderStore } from '@byte3-it/landing-page-builder'

function ProjectName() {
  const name = useBuilderStore((s) => s.project.name)
  return <span>{name}</span>
}
```

## Storage helpers

Ready-made helpers that implement the `fileManager` integration for common backends:

| Helper | Package |
|---|---|
| Firebase Storage | [`packages/storage-helper-firebase`](./packages/storage-helper-firebase) |

---

## Project structure (monorepo)

```
packages/
  sdk/                      → @byte3-it/landing-page-builder   (the builder component)
  storage-helper-firebase/  → @byte3-it/lpb-storage-firebase   (Firebase Storage helper)
apps/
  demo/      → Vite demo app
```
