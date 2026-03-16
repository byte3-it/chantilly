import React from 'react'

const TAILWIND_COLORS = [
  // Grays
  'text-gray-900', 'text-gray-700', 'text-gray-500', 'text-gray-400', 'text-gray-200',
  'text-white',
  // Blues
  'text-blue-900', 'text-blue-700', 'text-blue-500', 'text-blue-300',
  // Greens
  'text-green-700', 'text-green-500', 'text-green-300',
  // Reds
  'text-red-700', 'text-red-500', 'text-red-300',
  // Yellows
  'text-yellow-600', 'text-yellow-400',
  // Purples
  'text-purple-700', 'text-purple-500',
  // Indigo
  'text-indigo-700', 'text-indigo-500',
]

const BORDER_COLORS = [
  'border-gray-900', 'border-gray-700', 'border-gray-500', 'border-gray-300', 'border-gray-200',
  'border-blue-500', 'border-blue-300',
  'border-green-500', 'border-green-300',
  'border-red-500', 'border-red-300',
]

// Map Tailwind class to approximate hex for display
const COLOR_MAP: Record<string, string> = {
  'text-gray-900': '#111827', 'text-gray-700': '#374151', 'text-gray-500': '#6B7280',
  'text-gray-400': '#9CA3AF', 'text-gray-200': '#E5E7EB', 'text-white': '#FFFFFF',
  'text-blue-900': '#1E3A5F', 'text-blue-700': '#1D4ED8', 'text-blue-500': '#3B82F6',
  'text-blue-300': '#93C5FD',
  'text-green-700': '#15803D', 'text-green-500': '#22C55E', 'text-green-300': '#86EFAC',
  'text-red-700': '#B91C1C', 'text-red-500': '#EF4444', 'text-red-300': '#FCA5A5',
  'text-yellow-600': '#CA8A04', 'text-yellow-400': '#FACC15',
  'text-purple-700': '#7E22CE', 'text-purple-500': '#A855F7',
  'text-indigo-700': '#4338CA', 'text-indigo-500': '#6366F1',
  'border-gray-900': '#111827', 'border-gray-700': '#374151', 'border-gray-500': '#6B7280',
  'border-gray-300': '#D1D5DB', 'border-gray-200': '#E5E7EB',
  'border-blue-500': '#3B82F6', 'border-blue-300': '#93C5FD',
  'border-green-500': '#22C55E', 'border-green-300': '#86EFAC',
  'border-red-500': '#EF4444', 'border-red-300': '#FCA5A5',
}

interface ColorPickerProps {
  label?: string
  value: string
  mode?: 'text' | 'border'
  onChange: (value: string) => void
}

export function ColorPicker({ label, value, mode = 'text', onChange }: ColorPickerProps) {
  const colors = mode === 'border' ? BORDER_COLORS : TAILWIND_COLORS

  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-xs font-medium text-gray-600">{label}</span>}
      <div className="flex flex-wrap gap-1.5">
        {colors.map((color) => {
          const hex = COLOR_MAP[color] ?? '#888'
          return (
            <button
              key={color}
              title={color}
              onClick={() => onChange(color)}
              className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                value === color ? 'border-blue-500 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: hex }}
            />
          )
        })}
      </div>
    </div>
  )
}
