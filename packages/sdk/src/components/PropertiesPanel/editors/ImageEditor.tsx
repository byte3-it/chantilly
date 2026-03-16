import React, { useContext, useState } from 'react'
import { FolderOpen } from 'lucide-react'
import type { ImageBlock } from '../../../types/project'
import { useBuilderStore } from '../../../store/builderStore'
import { FileManagerContext } from '../../FileManager/FileManagerContext'
import { FileManagerModal } from '../../FileManager/FileManagerModal'
import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { Button } from '../../ui/Button'

interface Props { block: ImageBlock }

const widthOptions = [
  { value: 'w-full', label: 'Full Width' },
  { value: 'w-1/2', label: 'Half Width' },
  { value: 'w-auto', label: 'Auto' },
]

const alignOptions = [
  { value: 'text-left', label: 'Left' },
  { value: 'text-center', label: 'Center' },
  { value: 'text-right', label: 'Right' },
]

export function ImageEditor({ block }: Props) {
  const { updateBlock } = useBuilderStore()
  const fileManager = useContext(FileManagerContext)
  const [showFileManager, setShowFileManager] = useState(false)
  const update = (patch: Partial<ImageBlock>) => updateBlock(block.id, patch)

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Image URL"
        value={block.src}
        onChange={(e) => update({ src: e.target.value })}
        placeholder="https://..."
      />
      {fileManager && (
        <>
          <Button
            variant="secondary"
            onClick={() => setShowFileManager(true)}
            className="w-full"
          >
            <FolderOpen size={14} />
            Browse Images
          </Button>
          {showFileManager && (
            <FileManagerModal
              onSelect={(url) => {
                update({ src: url })
                setShowFileManager(false)
              }}
              onClose={() => setShowFileManager(false)}
            />
          )}
        </>
      )}
      <Input
        label="Alt Text"
        value={block.alt}
        onChange={(e) => update({ alt: e.target.value })}
        placeholder="Image description"
      />
      <Select
        label="Width"
        value={block.width}
        options={widthOptions}
        onChange={(e) => update({ width: e.target.value as ImageBlock['width'] })}
      />
      <Select
        label="Alignment"
        value={block.textAlign}
        options={alignOptions}
        onChange={(e) => update({ textAlign: e.target.value as ImageBlock['textAlign'] })}
      />
    </div>
  )
}
