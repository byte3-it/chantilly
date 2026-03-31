import React from 'react'
import type { DividerBlock as DividerBlockType } from '../../../types/project'

interface Props {
  block: DividerBlockType
  isSelected: boolean
  onClick: () => void
}

export function DividerBlock({ block, isSelected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer py-2 rounded px-1 -mx-1 ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-gray-300'
      }`}
    >
      <hr
        style={{ borderColor: block.color }}
        className={`${block.thickness} ${block.style === 'dashed' ? 'border-dashed' : 'border-solid'}`}
      />
    </div>
  )
}
