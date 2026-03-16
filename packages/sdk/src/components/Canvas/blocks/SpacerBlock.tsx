import React from 'react'
import type { SpacerBlock as SpacerBlockType } from '../../../types/project'

interface Props {
  block: SpacerBlockType
  isSelected: boolean
  onClick: () => void
}

export function SpacerBlock({ block, isSelected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded ${block.height} ${
        isSelected
          ? 'ring-2 ring-blue-500 bg-blue-50'
          : 'hover:ring-1 hover:ring-gray-300 hover:bg-gray-50'
      } relative`}
    >
      {isSelected && (
        <span className="absolute inset-0 flex items-center justify-center text-xs text-blue-400 font-medium">
          Spacer ({block.height})
        </span>
      )}
    </div>
  )
}
