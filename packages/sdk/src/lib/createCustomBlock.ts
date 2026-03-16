import type { CustomBlockDefinition, CustomBlock } from '../types/customBlock'
import type { TailwindTextAlign } from '../types/project'
import { generateId } from './generateId'

export function createCustomBlock(def: CustomBlockDefinition): CustomBlock {
  const { label, href, variant, size, textAlign, ...rest } = def.defaults ?? {}

  return {
    id: generateId(),
    type: 'custom',
    definitionId: def.id,
    elementType: def.elementType,
    label: String(label ?? def.label),
    href: String(href ?? '#'),
    variant: (variant ?? 'primary') as 'primary' | 'secondary',
    size: (size ?? 'md') as 'sm' | 'md' | 'lg',
    textAlign: (textAlign ?? 'text-left') as TailwindTextAlign,
    extraProps: rest as Record<string, unknown>,
  }
}
