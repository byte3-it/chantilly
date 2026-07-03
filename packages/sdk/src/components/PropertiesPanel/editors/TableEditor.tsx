import React from 'react'
import type { TableBlock } from '../../../types/project'
import { useBuilderStore } from '../../../store/builderStore'
import { Input } from '../../ui/Input'
import { ColorField } from '../../ui/ColorField'

interface Props { block: TableBlock }

const MIN_DIM = 1
const MAX_DIM = 20

export function TableEditor({ block }: Props) {
  const { updateBlock } = useBuilderStore()
  const update = (patch: Partial<TableBlock>) => updateBlock(block.id, patch)

  const rowCount = block.rows.length
  const colCount = block.rows[0]?.length ?? 0

  function setRowCount(next: number) {
    const n = Math.min(MAX_DIM, Math.max(MIN_DIM, next))
    const cols = colCount || 1
    let newRows = block.rows.slice(0, n)
    while (newRows.length < n) {
      newRows = [...newRows, Array.from({ length: cols }, () => '')]
    }
    update({ rows: newRows })
  }

  function setColCount(next: number) {
    const n = Math.min(MAX_DIM, Math.max(MIN_DIM, next))
    const newRows = block.rows.map((row) => {
      const r = row.slice(0, n)
      while (r.length < n) r.push('')
      return r
    })
    update({ rows: newRows })
  }

  function setCell(ri: number, ci: number, value: string) {
    const newRows = block.rows.map((row, i) =>
      i === ri ? row.map((cell, j) => (j === ci ? value : cell)) : row
    )
    update({ rows: newRows })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          label="Rows"
          type="number"
          min={MIN_DIM}
          max={MAX_DIM}
          value={rowCount}
          onChange={(e) => setRowCount(Number(e.target.value) || MIN_DIM)}
        />
        <Input
          label="Columns"
          type="number"
          min={MIN_DIM}
          max={MAX_DIM}
          value={colCount}
          onChange={(e) => setColCount(Number(e.target.value) || MIN_DIM)}
        />
      </div>

      <ColorField
        label="Text color"
        value={block.textColor}
        onChange={(textColor) => update({ textColor })}
      />

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-600">Show borders</label>
          <button
            type="button"
            onClick={() => update({ showBorders: !block.showBorders })}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
              block.showBorders ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition duration-200 ${
                block.showBorders ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        {block.showBorders && (
          <ColorField
            label="Border color"
            value={block.borderColor}
            onChange={(borderColor) => update({ borderColor })}
          />
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-600">Cell content</label>
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
        >
          {block.rows.map((row, ri) =>
            row.map((cell, ci) => (
              <input
                key={`${ri}-${ci}`}
                type="text"
                value={cell}
                onChange={(e) => setCell(ri, ci, e.target.value)}
                className="w-full min-w-0 rounded-md border border-gray-300 px-1.5 py-1 text-xs text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
