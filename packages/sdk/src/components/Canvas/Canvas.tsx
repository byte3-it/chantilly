import React, { useContext } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useBuilderStore } from '../../store/builderStore'
import { DEFAULT_PROJECT_SETTINGS } from '../../types/project'
import { PreviewModeContext } from '../PreviewModeContext'
import { CanvasBlock } from './CanvasBlock'

export function Canvas() {
  const { project, selectedBlockId, selectBlock } = useBuilderStore()
  const previewMode = useContext(PreviewModeContext)
  const backgroundColor =
    project.settings?.backgroundColor ?? DEFAULT_PROJECT_SETTINGS.backgroundColor
  const blocks = project.blocks

  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-droppable' })

  return (
    <div
      className="flex-1 overflow-y-auto bg-gray-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) selectBlock(null)
      }}
    >
      <div className={`${previewMode === 'mobile' ? 'max-w-sm' : 'max-w-3xl'} mx-auto py-12 px-8 transition-all duration-300`}>
        {/* Canvas paper */}
        <div
          ref={setNodeRef}
          style={{ backgroundColor }}
          className={`rounded-lg shadow-sm border min-h-[600px] p-10 transition-colors ${
            isOver ? 'border-blue-400 bg-blue-50/30' : 'border-gray-200'
          }`}
          onClick={(e) => { if (e.target === e.currentTarget) selectBlock(null) }}
        >
          {blocks.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400 pointer-events-none">
              <div className="text-center">
                <p className="text-lg font-medium">Drag blocks here</p>
                <p className="text-sm mt-1">or click a block type in the sidebar</p>
              </div>
            </div>
          ) : (
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-4 pl-8 pr-8">
                {blocks.map((block) => (
                  <CanvasBlock
                    key={block.id}
                    block={block}
                    isSelected={selectedBlockId === block.id}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </div>
    </div>
  )
}
