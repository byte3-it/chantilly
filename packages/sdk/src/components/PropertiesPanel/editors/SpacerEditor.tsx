import React from 'react'
import type { SpacerBlock } from '../../../types/project'
import { useBuilderStore } from '../../../store/builderStore'
import { Select } from '../../ui/Select'

interface Props { block: SpacerBlock }

const heightOptions = [
  { value: 'py-4', label: 'Small (py-4)' },
  { value: 'py-8', label: 'Medium (py-8)' },
  { value: 'py-12', label: 'Large (py-12)' },
  { value: 'py-20', label: 'XL (py-20)' },
]

export function SpacerEditor({ block }: Props) {
  const { updateBlock } = useBuilderStore()

  return (
    <div className="flex flex-col gap-4">
      <Select
        label="Height"
        value={block.height}
        options={heightOptions}
        onChange={(e) => updateBlock(block.id, { height: e.target.value as SpacerBlock['height'] })}
      />
    </div>
  )
}
