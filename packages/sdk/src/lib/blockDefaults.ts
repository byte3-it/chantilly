import type { Block, BlockType } from '../types/project'
import { generateId } from './generateId'

export function createDefaultBlock(type: BlockType): Block {
  const id = generateId()

  switch (type) {
    case 'heading':
      return {
        id,
        type: 'heading',
        text: 'New Heading',
        level: 'h2',
        textAlign: 'text-left',
        color: 'text-gray-900',
        fontSize: 'text-2xl',
      }
    case 'text':
      return {
        id,
        type: 'text',
        content: 'Add your text content here.',
        textAlign: 'text-left',
        color: 'text-gray-700',
        fontSize: 'text-base',
      }
    case 'image':
      return {
        id,
        type: 'image',
        src: '',
        alt: 'Image description',
        width: 'w-full',
        textAlign: 'text-center',
      }
    case 'button':
      return {
        id,
        type: 'button',
        label: 'Click Me',
        href: '#',
        variant: 'primary',
        size: 'md',
        textAlign: 'text-center',
      }
    case 'divider':
      return {
        id,
        type: 'divider',
        style: 'solid',
        color: 'border-gray-300',
        thickness: 'border',
      }
    case 'spacer':
      return {
        id,
        type: 'spacer',
        height: 'py-8',
      }
    case 'countdown': {
      const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16)
      return {
        id,
        type: 'countdown',
        targetDate: sevenDaysFromNow,
        label: 'Offer ends in',
        textAlign: 'text-center',
        color: 'text-gray-900',
      }
    }
  }
}
