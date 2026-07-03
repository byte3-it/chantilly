import React from 'react'
import type { TableBlock as TableBlockType } from '../../../types/project'

interface Props {
  block: TableBlockType
  isSelected: boolean
  onClick: () => void
}

export function TableBlock({ block, isSelected, onClick }: Props) {
  const { rows, showBorders, borderColor, textColor } = block
  const cellStyle: React.CSSProperties = showBorders
    ? { border: `1px solid ${borderColor}` }
    : {}

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded px-1 -mx-1 py-1 ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-gray-300'
      }`}
    >
      <table style={{ width: '100%', borderCollapse: showBorders ? 'collapse' : 'separate' }}>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ ...cellStyle, padding: '6px 10px', verticalAlign: 'top', color: textColor }} className="text-sm">
                  {cell || <span className="text-gray-300 italic">&nbsp;</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
