import React from 'react'
import type { TextBlock } from '../../../types/project'
import { useBuilderStore } from '../../../store/builderStore'
import { Select } from '../../ui/Select'
import { ColorPicker } from '../../ui/ColorPicker'

interface Props { block: TextBlock }

const alignOptions = [
  { value: 'text-left', label: 'Left' },
  { value: 'text-center', label: 'Center' },
  { value: 'text-right', label: 'Right' },
]

const fontSizeOptions = [
  { value: 'text-sm', label: 'Small' },
  { value: 'text-base', label: 'Base' },
  { value: 'text-lg', label: 'Large' },
  { value: 'text-xl', label: 'XL' },
]

export function TextEditor({ block }: Props) {
  const { updateBlock } = useBuilderStore()
  const update = (patch: Partial<TextBlock>) => updateBlock(block.id, patch)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Content</label>
        <textarea
          value={block.content}
          onChange={(e) => update({ content: e.target.value })}
          rows={4}
          className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
        />
      </div>
      <Select
        label="Alignment"
        value={block.textAlign}
        options={alignOptions}
        onChange={(e) => update({ textAlign: e.target.value as TextBlock['textAlign'] })}
      />
      <Select
        label="Font Size"
        value={block.fontSize}
        options={fontSizeOptions}
        onChange={(e) => update({ fontSize: e.target.value })}
      />
      <ColorPicker
        label="Color"
        value={block.color}
        onChange={(color) => update({ color })}
      />
    </div>
  )
}
