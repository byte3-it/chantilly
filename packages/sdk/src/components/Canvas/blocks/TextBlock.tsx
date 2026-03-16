import React from 'react'
import type { TextBlock as TextBlockType } from '../../../types/project'

interface Props {
  block: TextBlockType
  isSelected: boolean
  onClick: () => void
}

export function TextBlock({ block, isSelected, onClick }: Props) {
  return (
    <p
      onClick={onClick}
      className={`${block.textAlign} ${block.color} ${block.fontSize} cursor-pointer rounded px-1 -mx-1 ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-gray-300'
      }`}
    >
      {block.content || <span className="text-gray-400 italic">Empty text block</span>}
    </p>
  )
}
