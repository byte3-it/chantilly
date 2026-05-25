import React from 'react'
import type { SpacerBlock } from '../../../types/project'
import { useBuilderStore } from '../../../store/builderStore'

interface Props { block: SpacerBlock }

const HEIGHTS: SpacerBlock['height'][] = [
  'py-1', 'py-2', 'py-3', 'py-4', 'py-6', 'py-8', 'py-10', 'py-12', 'py-16', 'py-20',
]

export function SpacerEditor({ block }: Props) {
  const { updateBlock } = useBuilderStore()
  const index = Math.max(0, HEIGHTS.indexOf(block.height))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-600">Height</label>
          <span className="text-xs text-gray-500">{block.height.replace('py-', '')}</span>
        </div>
        <input
          type="range"
          min={0}
          max={HEIGHTS.length - 1}
          step={1}
          value={index}
          onChange={(e) => updateBlock(block.id, { height: HEIGHTS[Number(e.target.value)] })}
          className="w-full accent-blue-500"
        />
      </div>
    </div>
  )
}
