import React, { useContext, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { FileManagerContext } from './FileManagerContext'
import { ImageGrid } from './ImageGrid'
import { UploadButton } from './UploadButton'
import type { ImageFile } from '../../types/fileManager'

interface Props {
  onSelect: (url: string) => void
  onClose: () => void
}

export function FileManagerModal({ onSelect, onClose }: Props) {
  const fileManager = useContext(FileManagerContext)
  const [images, setImages] = useState<ImageFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!fileManager) return
    fileManager.listImages().then((imgs) => {
      setImages(imgs)
      setLoading(false)
    })
  }, [fileManager])

  const handleUpload = async (file: File) => {
    if (!fileManager) return
    setUploading(true)
    try {
      const img = await fileManager.uploadImage(file)
      setImages((prev) => [img, ...prev])
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!fileManager) return
    await fileManager.deleteImage(id)
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Image Library</h2>
          <div className="flex items-center gap-3">
            <UploadButton onUpload={handleUpload} loading={uploading} />
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-48 text-gray-400">
              <p className="text-sm">Loading...</p>
            </div>
          ) : (
            <ImageGrid images={images} onSelect={onSelect} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  )
}
