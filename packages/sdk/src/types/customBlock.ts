import type { ReactNode } from 'react'
import type { TailwindTextAlign } from './project'

export interface CustomBlockDefinition {
  id: string
  label: string
  icon?: ReactNode
  elementType: 'button' | 'link' | 'text'
  defaults?: {
    label?: string
    href?: string
    variant?: 'primary' | 'secondary'
    size?: 'sm' | 'md' | 'lg'
    textAlign?: TailwindTextAlign
    [key: string]: unknown
  }
}

export interface CustomBlock {
  id: string
  type: 'custom'
  definitionId: string
  elementType: 'button' | 'link' | 'text'
  label: string
  href: string
  variant: 'primary' | 'secondary'
  size: 'sm' | 'md' | 'lg'
  textAlign: TailwindTextAlign
  extraProps: Record<string, unknown>
}
