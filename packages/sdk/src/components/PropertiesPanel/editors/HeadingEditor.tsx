import React from 'react'
import type { HeadingBlock } from '../../../types/project'
import { useBuilderStore } from '../../../store/builderStore'
import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { ColorField } from '../../ui/ColorField'

interface Props { block: HeadingBlock }

const levelOptions = [
  { value: 'h1', label: 'H1 — Page Title' },
  { value: 'h2', label: 'H2 — Section Title' },
  { value: 'h3', label: 'H3 — Subsection' },
]

const alignOptions = [
  { value: 'text-left', label: 'Left' },
  { value: 'text-center', label: 'Center' },
  { value: 'text-right', label: 'Right' },
]

const fontSizeOptions = [
  { value: 'text-xl', label: 'XL' },
  { value: 'text-2xl', label: '2XL' },
  { value: 'text-3xl', label: '3XL' },
  { value: 'text-4xl', label: '4XL' },
  { value: 'text-5xl', label: '5XL' },
]

export function HeadingEditor({ block }: Props) {
  const { updateBlock } = useBuilderStore()
  const update = (patch: Partial<HeadingBlock>) => updateBlock(block.id, patch)

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Text"
        value={block.text}
        onChange={(e) => update({ text: e.target.value })}
      />
      <Select
        label="Level"
        value={block.level}
        options={levelOptions}
        onChange={(e) => {
          const level = e.target.value as HeadingBlock['level']
          const sizeByLevel: Record<HeadingBlock['level'], string> = {
            h1: 'text-4xl',
            h2: 'text-2xl',
            h3: 'text-xl',
          }
          update({ level, fontSize: sizeByLevel[level] })
        }}
      />
      <Select
        label="Alignment"
        value={block.textAlign}
        options={alignOptions}
        onChange={(e) => update({ textAlign: e.target.value as HeadingBlock['textAlign'] })}
      />
      <Select
        label="Font Size"
        value={block.fontSize}
        options={fontSizeOptions}
        onChange={(e) => update({ fontSize: e.target.value })}
      />
      <ColorField
        label="Color"
        value={block.color}
        onChange={(color) => update({ color })}
      />
    </div>
  )
}
