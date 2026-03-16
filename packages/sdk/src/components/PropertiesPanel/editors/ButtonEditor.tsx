import React from 'react'
import type { ButtonBlock } from '../../../types/project'
import { useBuilderStore } from '../../../store/builderStore'
import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'

interface Props { block: ButtonBlock }

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

export function ButtonEditor({ block }: Props) {
  const { updateBlock } = useBuilderStore()
  const update = (patch: Partial<ButtonBlock>) => updateBlock(block.id, patch)

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Label"
        value={block.label}
        onChange={(e) => update({ label: e.target.value })}
      />
      <Input
        label="URL (href)"
        value={block.href}
        onChange={(e) => update({ href: e.target.value })}
        placeholder="https://..."
      />
      <Select
        label="Variant"
        value={block.variant}
        options={variantOptions}
        onChange={(e) => update({ variant: e.target.value as ButtonBlock['variant'] })}
      />
      <Select
        label="Size"
        value={block.size}
        options={sizeOptions}
        onChange={(e) => update({ size: e.target.value as ButtonBlock['size'] })}
      />
      <Select
        label="Alignment"
        value={block.textAlign}
        options={alignOptions}
        onChange={(e) => update({ textAlign: e.target.value as ButtonBlock['textAlign'] })}
      />
    </div>
  )
}
