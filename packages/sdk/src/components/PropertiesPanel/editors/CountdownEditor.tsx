import React from 'react'
import type { CountdownBlock } from '../../../types/project'
import { useBuilderStore } from '../../../store/builderStore'
import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { ColorPicker } from '../../ui/ColorPicker'

interface Props { block: CountdownBlock }

const alignOptions = [
  { value: 'text-left', label: 'Left' },
  { value: 'text-center', label: 'Center' },
  { value: 'text-right', label: 'Right' },
]

export function CountdownEditor({ block }: Props) {
  const { updateBlock } = useBuilderStore()
  const update = (patch: Partial<CountdownBlock>) => updateBlock(block.id, patch)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Target Date & Time</label>
        <input
          type="datetime-local"
          value={block.targetDate}
          onChange={(e) => update({ targetDate: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <Input
        label="Label"
        value={block.label}
        onChange={(e) => update({ label: e.target.value })}
        placeholder="e.g. Offer ends in"
      />
      <Select
        label="Alignment"
        value={block.textAlign}
        options={alignOptions}
        onChange={(e) => update({ textAlign: e.target.value as CountdownBlock['textAlign'] })}
      />
      <ColorPicker
        label="Color"
        value={block.color}
        onChange={(color) => update({ color })}
      />
    </div>
  )
}
