import React, { useRef } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '../ui/Button'

interface Props {
  onUpload: (file: File) => void
  loading?: boolean
}

export function UploadButton({ onUpload, loading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onUpload(file)
          e.target.value = ''
        }}
      />
      <Button
        variant="primary"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
      >
        <Upload size={14} />
        {loading ? 'Uploading...' : 'Upload Image'}
      </Button>
    </>
  )
}
