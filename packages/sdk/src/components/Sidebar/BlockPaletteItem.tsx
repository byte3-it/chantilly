import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { Plus } from 'lucide-react'
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
    <div
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="flex items-center gap-3 flex-1 cursor-grab active:cursor-grabbing min-w-0"
      >
        <span className="text-gray-500 flex-shrink-0">{icon}</span>
        <span className="text-sm font-medium text-gray-700 truncate">{label}</span>
      </div>
      <button
        onClick={onClick}
        className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-0.5 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-800"
        title={`Add ${label}`}
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
