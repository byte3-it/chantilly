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
    const ml = marker.length

    let newContent: string
    let newStart: number
    let newEnd: number

    // Toggle off: selection itself contains the markers (*bold*)
    if (selected.startsWith(marker) && selected.endsWith(marker) && selected.length > ml * 2) {
      const inner = selected.slice(ml, -ml)
      newContent = value.slice(0, selectionStart) + inner + value.slice(selectionEnd)
      newStart = selectionStart
      newEnd = selectionStart + inner.length
    // Toggle off: markers sit immediately outside the selection
    } else if (
      selectionStart >= ml &&
      value.slice(selectionStart - ml, selectionStart) === marker &&
      value.slice(selectionEnd, selectionEnd + ml) === marker
    ) {
      newContent = value.slice(0, selectionStart - ml) + selected + value.slice(selectionEnd + ml)
      newStart = selectionStart - ml
      newEnd = newStart + selected.length
    // Toggle on: wrap selection with markers
    } else {
      newContent = value.slice(0, selectionStart) + marker + selected + marker + value.slice(selectionEnd)
      newStart = selectionStart + ml
      newEnd = selectionEnd + ml
    }

    update({ content: newContent })
    requestAnimationFrame(() => {
      ta.focus()
      ta.setSelectionRange(newStart, newEnd)
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
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-600">Background color</label>
          <button
            type="button"
            onClick={() => update({ backgroundColor: block.backgroundColor ? undefined : '#f3f4f6' })}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
              block.backgroundColor ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition duration-200 ${
                block.backgroundColor ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        {block.backgroundColor && (
          <ColorField
            label=""
            value={block.backgroundColor}
            onChange={(backgroundColor) => update({ backgroundColor })}
          />
        )}
      </div>
    </div>
  )
}
