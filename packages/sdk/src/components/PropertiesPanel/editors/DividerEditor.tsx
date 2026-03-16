import React from 'react'
import type { DividerBlock } from '../../../types/project'
import { useBuilderStore } from '../../../store/builderStore'
import { Select } from '../../ui/Select'
import { ColorPicker } from '../../ui/ColorPicker'

interface Props { block: DividerBlock }

const styleOptions = [
  { value: 'solid', label: 'Solid' },
  { value: 'dashed', label: 'Dashed' },
]

const thicknessOptions = [
  { value: 'border', label: '1px' },
  { value: 'border-2', label: '2px' },
  { value: 'border-4', label: '4px' },
]

export function DividerEditor({ block }: Props) {
  const { updateBlock } = useBuilderStore()
  const update = (patch: Partial<DividerBlock>) => updateBlock(block.id, patch)

  return (
    <div className="flex flex-col gap-4">
      <Select
        label="Style"
        value={block.style}
        options={styleOptions}
        onChange={(e) => update({ style: e.target.value as DividerBlock['style'] })}
      />
      <Select
        label="Thickness"
        value={block.thickness}
        options={thicknessOptions}
        onChange={(e) => update({ thickness: e.target.value as DividerBlock['thickness'] })}
      />
      <ColorPicker
        label="Color"
        value={block.color}
        mode="border"
        onChange={(color) => update({ color })}
      />
    </div>
  )
}
