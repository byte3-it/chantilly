import React, { useRef } from 'react'
import type { TextBlock } from '../../../types/project'
import { useBuilderStore } from '../../../store/builderStore'
import { Select } from '../../ui/Select'
import { ColorField } from '../../ui/ColorField'

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
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function applyFormat(marker: string) {
    const ta = textareaRef.current
    if (!ta) return
    const { selectionStart, selectionEnd, value } = ta
    const selected = value.slice(selectionStart, selectionEnd)
    const newContent =
      value.slice(0, selectionStart) + marker + selected + marker + value.slice(selectionEnd)
    update({ content: newContent })
    requestAnimationFrame(() => {
      ta.focus()
      ta.setSelectionRange(selectionStart + marker.length, selectionEnd + marker.length)
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Content</label>
        <div className="flex gap-1 mb-1">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormat('*')}
            className="px-2 py-0.5 text-sm font-bold border border-gray-300 rounded hover:bg-gray-100 text-gray-700"
            title="Bold (*text*)"
          >
            B
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormat('_')}
            className="px-2 py-0.5 text-sm italic border border-gray-300 rounded hover:bg-gray-100 text-gray-700"
            title="Italic (_text_)"
          >
            I
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormat('~')}
            className="px-2 py-0.5 text-sm underline border border-gray-300 rounded hover:bg-gray-100 text-gray-700"
            title="Underline (~text~)"
          >
            U
          </button>
        </div>
        <textarea
          ref={textareaRef}
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
      <ColorField
        label="Color"
        value={block.color}
        onChange={(color) => update({ color })}
      />
    </div>
  )
}
