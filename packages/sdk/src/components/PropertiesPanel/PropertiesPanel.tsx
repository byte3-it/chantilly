import React from 'react'
import { X } from 'lucide-react'
import { useBuilderStore } from '../../store/builderStore'
import { HeadingEditor } from './editors/HeadingEditor'
import { TextEditor } from './editors/TextEditor'
import { ImageEditor } from './editors/ImageEditor'
import { ButtonEditor } from './editors/ButtonEditor'
import { DividerEditor } from './editors/DividerEditor'
import { SpacerEditor } from './editors/SpacerEditor'
import { CustomBlockEditor } from './editors/CustomBlockEditor'
import { CountdownEditor } from './editors/CountdownEditor'
import { TableEditor } from './editors/TableEditor'
import type { Block } from '../../types/project'

function EditorFor({ block }: { block: Block }) {
  switch (block.type) {
    case 'heading': return <HeadingEditor block={block} />
    case 'text': return <TextEditor block={block} />
    case 'image': return <ImageEditor block={block} />
    case 'button': return <ButtonEditor block={block} />
    case 'divider': return <DividerEditor block={block} />
    case 'spacer': return <SpacerEditor block={block} />
    case 'countdown': return <CountdownEditor block={block} />
    case 'table': return <TableEditor block={block} />
    case 'custom': return <CustomBlockEditor block={block} />
  }
}

const BLOCK_LABELS: Record<string, string> = {
  heading: 'Heading',
  text: 'Text',
  image: 'Image',
  button: 'Button',
  divider: 'Divider',
  spacer: 'Spacer',
  countdown: 'Countdown',
  table: 'Table',
  custom: 'Custom Block',
}

export function PropertiesPanel() {
  const { project, selectedBlockId, selectBlock } = useBuilderStore()
  const block = project.blocks.find((b) => b.id === selectedBlockId)

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {block ? `${BLOCK_LABELS[block.type]} Properties` : 'Properties'}
        </h2>
        {block && (
          <button
            onClick={() => selectBlock(null)}
            className="text-gray-400 hover:text-gray-600 p-0.5 rounded"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {block ? (
          <EditorFor block={block} />
        ) : (
          <p className="text-sm text-gray-400 text-center mt-8">
            Select a block to edit its properties
          </p>
        )}
      </div>
    </div>
  )
}
