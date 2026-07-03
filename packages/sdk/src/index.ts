// Main component
export { LandingPageBuilder } from './components/LandingPageBuilder'
export type { LandingPageBuilderProps } from './components/LandingPageBuilder'

// Renderer
export { LandingPageRenderer } from './components/LandingPageRenderer/LandingPageRenderer'
export type { LandingPageRendererProps } from './components/LandingPageRenderer/LandingPageRenderer'

// Types
export type {
  Block,
  BlockType,
  Project,
  HeadingBlock,
  TextBlock,
  ImageBlock,
  ButtonBlock,
  DividerBlock,
  SpacerBlock,
  CountdownBlock,
  TableBlock,
  TailwindTextAlign,
  ProjectSettings,
  DEFAULT_PROJECT_SETTINGS,
} from './types/project'
export type { FileManagerConfig, ImageFile } from './types/fileManager'
export type { CustomBlockDefinition, CustomBlock } from './types/customBlock'
export type { TemplateDefinition } from './types/template'
export { createCustomBlock } from './lib/createCustomBlock'

// Store
export { useBuilderStore } from './store/builderStore'

// Export utils
export { exportToHtml } from './export/exportToHtml'
export { exportProject } from './export/exportProject'

// Lib
export { generateId } from './lib/generateId'
export { createDefaultBlock } from './lib/blockDefaults'
