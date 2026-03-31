export type TailwindTextAlign = 'text-left' | 'text-center' | 'text-right'

export interface ProjectSettings {
  backgroundColor: string
  primaryColor: string
  primaryTextColor: string
  secondaryColor: string
  secondaryTextColor: string
  secondaryBorderColor: string
}

export const DEFAULT_PROJECT_SETTINGS: ProjectSettings = {
  backgroundColor: '#ffffff',
  primaryColor: '#2563eb',
  primaryTextColor: '#ffffff',
  secondaryColor: '#ffffff',
  secondaryTextColor: '#111827',
  secondaryBorderColor: '#d1d5db',
}
export type BlockType = 'heading' | 'text' | 'image' | 'button' | 'divider' | 'spacer' | 'countdown'

interface BaseBlock {
  id: string
  type: BlockType
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading'
  text: string
  level: 'h1' | 'h2' | 'h3'
  textAlign: TailwindTextAlign
  color: string
  fontSize: string
}

export interface TextBlock extends BaseBlock {
  type: 'text'
  content: string
  textAlign: TailwindTextAlign
  color: string
  fontSize: string
}

export interface ImageBlock extends BaseBlock {
  type: 'image'
  src: string
  alt: string
  width: 'w-full' | 'w-1/2' | 'w-auto'
  textAlign: TailwindTextAlign
}

export interface ButtonBlock extends BaseBlock {
  type: 'button'
  label: string
  href: string
  variant: 'primary' | 'secondary'
  size: 'sm' | 'md' | 'lg'
  textAlign: TailwindTextAlign
}

export interface DividerBlock extends BaseBlock {
  type: 'divider'
  style: 'solid' | 'dashed'
  color: string
  thickness: 'border' | 'border-2' | 'border-4'
}

export interface SpacerBlock extends BaseBlock {
  type: 'spacer'
  height: 'py-4' | 'py-8' | 'py-12' | 'py-20'
}

export interface CountdownBlock extends BaseBlock {
  type: 'countdown'
  targetDate: string        // ISO-8601 datetime string
  label: string             // e.g. "Offer ends in"
  textAlign: TailwindTextAlign
  color: string
}

import type { CustomBlock } from './customBlock'
export type { CustomBlock }

export type Block =
  | HeadingBlock
  | TextBlock
  | ImageBlock
  | ButtonBlock
  | DividerBlock
  | SpacerBlock
  | CountdownBlock
  | CustomBlock

export interface Project {
  id: string
  name: string
  mode: 'web' | 'email'
  meta: {
    title: string
    description: string
    lang: string
  }
  settings?: ProjectSettings
  blocks: Block[]
}
