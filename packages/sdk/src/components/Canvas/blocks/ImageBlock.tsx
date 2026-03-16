import React from 'react'
import { ImageIcon } from 'lucide-react'
import type { ImageBlock as ImageBlockType } from '../../../types/project'

interface Props {
  block: ImageBlockType
  isSelected: boolean
  onClick: () => void
}

export function ImageBlock({ block, isSelected, onClick }: Props) {
  const alignClass =
    block.textAlign === 'text-center'
      ? 'flex justify-center'
      : block.textAlign === 'text-right'
      ? 'flex justify-end'
      : ''

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded px-1 -mx-1 ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-gray-300'
      }`}
    >
      {block.src ? (
        <div className={alignClass}>
          <img src={block.src} alt={block.alt} className={`${block.width} h-auto rounded`} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-32 bg-gray-100 rounded border-2 border-dashed border-gray-300 text-gray-400">
          <div className="flex flex-col items-center gap-1">
            <ImageIcon size={24} />
            <span className="text-sm">No image selected</span>
          </div>
        </div>
      )}
    </div>
  )
}
