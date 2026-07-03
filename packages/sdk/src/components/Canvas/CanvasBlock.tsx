import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'
import type { Block } from '../../types/project'
import { useBuilderStore } from '../../store/builderStore'
import { HeadingBlock } from './blocks/HeadingBlock'
import { TextBlock } from './blocks/TextBlock'
import { ImageBlock } from './blocks/ImageBlock'
import { ButtonBlock } from './blocks/ButtonBlock'
import { DividerBlock } from './blocks/DividerBlock'
import { SpacerBlock } from './blocks/SpacerBlock'
import { CustomBlock } from './blocks/CustomBlock'
import { CountdownBlock } from './blocks/CountdownBlock'
import { TableBlock } from './blocks/TableBlock'

interface Props {
  block: Block
  isSelected: boolean
}

function BlockRenderer({ block, isSelected, onClick }: { block: Block; isSelected: boolean; onClick: () => void }) {
  switch (block.type) {
    case 'heading': return <HeadingBlock block={block} isSelected={isSelected} onClick={onClick} />
    case 'text': return <TextBlock block={block} isSelected={isSelected} onClick={onClick} />
    case 'image': return <ImageBlock block={block} isSelected={isSelected} onClick={onClick} />
    case 'button': return <ButtonBlock block={block} isSelected={isSelected} onClick={onClick} />
    case 'divider': return <DividerBlock block={block} isSelected={isSelected} onClick={onClick} />
    case 'spacer': return <SpacerBlock block={block} isSelected={isSelected} onClick={onClick} />
    case 'countdown': return <CountdownBlock block={block} isSelected={isSelected} onClick={onClick} />
    case 'table': return <TableBlock block={block} isSelected={isSelected} onClick={onClick} />
    case 'custom': return <CustomBlock block={block} isSelected={isSelected} onClick={onClick} />
  }
}

export function CanvasBlock({ block, isSelected }: Props) {
  const { selectBlock, removeBlock } = useBuilderStore()

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
    data: { source: 'canvas', block },
  })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative"
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1 rounded hover:bg-gray-100 text-gray-400"
      >
        <GripVertical size={14} />
      </div>

      <BlockRenderer
        block={block}
        isSelected={isSelected}
        onClick={() => selectBlock(block.id)}
      />

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          removeBlock(block.id)
        }}
        className="absolute -right-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-100 text-gray-400 hover:text-red-600"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
