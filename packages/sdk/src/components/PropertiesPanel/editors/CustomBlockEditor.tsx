import React from 'react'
import type { CustomBlock } from '../../../types/customBlock'
import { useBuilderStore } from '../../../store/builderStore'
import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import type { Block } from '../../../types/project'

interface Props { block: CustomBlock }

const variantOptions = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
]

const sizeOptions = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
]

const alignOptions = [
  { value: 'text-left', label: 'Left' },
  { value: 'text-center', label: 'Center' },
  { value: 'text-right', label: 'Right' },
]

export function CustomBlockEditor({ block }: Props) {
  const { updateBlock } = useBuilderStore()
  const update = (patch: Partial<CustomBlock>) => updateBlock(block.id, patch as Partial<Block>)

  const hasExtraProps = Object.keys(block.extraProps).length > 0

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Label"
        value={block.label}
        onChange={(e) => update({ label: e.target.value })}
      />
      {block.elementType === 'button' && (
        <Select
          label="Variant"
          value={block.variant}
          options={variantOptions}
          onChange={(e) => update({ variant: e.target.value as CustomBlock['variant'] })}
        />
      )}
      <Select
        label="Size"
        value={block.size}
        options={sizeOptions}
        onChange={(e) => update({ size: e.target.value as CustomBlock['size'] })}
      />
      <Select
        label="Alignment"
        value={block.textAlign}
        options={alignOptions}
        onChange={(e) => update({ textAlign: e.target.value as CustomBlock['textAlign'] })}
      />
      {hasExtraProps && (
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-gray-600">Custom Properties</span>
          <pre className="bg-gray-50 border border-gray-200 rounded-md p-2.5 text-xs text-gray-700 overflow-x-auto leading-relaxed">
            {JSON.stringify(block.extraProps, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
