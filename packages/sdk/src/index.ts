// Main component
export { LandingPageBuilder } from './components/LandingPageBuilder'
export type { LandingPageBuilderProps } from './components/LandingPageBuilder'

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

// Export util
export { exportToHtml } from './export/exportToHtml'

// Lib
export { generateId } from './lib/generateId'
export { createDefaultBlock } from './lib/blockDefaults'
