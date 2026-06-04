import React, { useEffect, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

interface Props {
  label?: string
  value: string
  onChange: (color: string) => void
}

export function ColorField({ label, value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-gray-600">{label}</label>}
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
        >
          <span
            className="w-5 h-5 rounded-md border border-gray-200 shrink-0"
            style={{ backgroundColor: value }}
          />
          <span className="text-sm font-mono text-gray-700">{value}</span>
        </button>
        {open && (
          <div className="absolute top-full left-0 mt-1.5 z-50 shadow-xl rounded-xl overflow-hidden border border-gray-200">
            <HexColorPicker color={value} onChange={onChange} />
            <div className="bg-white px-3 py-2 border-t border-gray-100">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-sm font-mono text-gray-700 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="#000000"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
