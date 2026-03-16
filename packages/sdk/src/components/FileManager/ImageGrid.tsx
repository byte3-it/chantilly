import React from 'react'
import { Trash2 } from 'lucide-react'
import type { ImageFile } from '../../types/fileManager'

interface Props {
  images: ImageFile[]
  onSelect: (url: string) => void
  onDelete: (id: string) => void
}

export function ImageGrid({ images, onSelect, onDelete }: Props) {
  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400">
        <p className="text-sm">No images yet. Upload one to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {images.map((img) => (
        <div
          key={img.id}
          className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:border-blue-400 transition-colors"
          onClick={() => onSelect(img.url)}
        >
          <img
            src={img.url}
            alt={img.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(img.id)
            }}
            className="absolute top-1 right-1 p-1 rounded bg-white/80 text-gray-700 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 size={12} />
          </button>
          <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs px-2 py-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
            {img.name}
          </div>
        </div>
      ))}
    </div>
  )
}
