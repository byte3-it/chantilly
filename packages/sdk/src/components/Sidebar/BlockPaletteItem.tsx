import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import type { BlockType } from '../../types/project'

interface Props {
  type: BlockType
  label: string
  icon: React.ReactNode
  onClick: () => void
}

export function BlockPaletteItem({ type, label, icon, onClick }: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { source: 'palette', type },
  })

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-grab active:cursor-grabbing text-left ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <span className="text-gray-500 flex-shrink-0">{icon}</span>
      {label}
    </button>
  )
}
