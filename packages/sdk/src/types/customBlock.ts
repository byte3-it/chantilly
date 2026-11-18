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
  actionButton?: {
    icon: ReactNode
    title?: string
    onClick: (def: CustomBlockDefinition) => void
  }
  /**
   * Image shown in the builder canvas instead of the label, e.g. when the label is a
   * placeholder the host app replaces with an image after export. Editor-only: it is not
   * stored in the project and the export still outputs the label.
   */
  previewImage?: {
    src: string
    width: number
    height: number
    alt: string
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
