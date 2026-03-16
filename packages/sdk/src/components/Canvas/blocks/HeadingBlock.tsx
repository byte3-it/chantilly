import React from 'react'
import type { HeadingBlock as HeadingBlockType } from '../../../types/project'

interface Props {
  block: HeadingBlockType
  isSelected: boolean
  onClick: () => void
}

export function HeadingBlock({ block, isSelected, onClick }: Props) {
  const Tag = block.level as keyof JSX.IntrinsicElements
  return (
    <Tag
      onClick={onClick}
      className={`${block.textAlign} ${block.color} ${block.fontSize} font-bold cursor-pointer rounded px-1 -mx-1 outline-none ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-gray-300'
      }`}
    >
      {block.text || <span className="text-gray-400 italic">Empty heading</span>}
    </Tag>
  )
}
