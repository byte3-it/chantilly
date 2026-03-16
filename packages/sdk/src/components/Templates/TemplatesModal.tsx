import React, { useContext } from 'react'
import { X, LayoutTemplate } from 'lucide-react'
import { TemplatesContext } from '../TemplatesContext'
import type { TemplateDefinition } from '../../types/template'
import { generateId } from '../../lib/generateId'
import type { Project } from '../../types/project'

interface Props {
  onSelect: (project: Project) => void
  onClose: () => void
}

// Distinct placeholder gradients for templates without a thumbnail
const GRADIENTS = [
  'from-blue-400 to-indigo-600',
  'from-violet-400 to-purple-600',
  'from-emerald-400 to-teal-600',
  'from-rose-400 to-pink-600',
  'from-amber-400 to-orange-600',
  'from-cyan-400 to-sky-600',
]

function TemplateCard({
  template,
  index,
  onSelect,
}: {
  template: TemplateDefinition
  index: number
  onSelect: () => void
}) {
  const gradient = GRADIENTS[index % GRADIENTS.length]

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 overflow-hidden hover:border-blue-400 hover:shadow-md transition-all group">
      {/* Thumbnail */}
      <div className="h-36 shrink-0 overflow-hidden bg-gray-100">
        {template.thumbnail ? (
          <img
            src={template.thumbnail}
            alt={template.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <LayoutTemplate size={32} className="text-white/70" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <p className="text-sm font-semibold text-gray-900">{template.name}</p>
        {template.description && (
          <p className="text-xs text-gray-500 leading-relaxed flex-1">{template.description}</p>
        )}
        <button
          onClick={onSelect}
          className="mt-1 w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1.5 transition-colors"
        >
          Use Template
        </button>
      </div>
    </div>
  )
}

export function TemplatesModal({ onSelect, onClose }: Props) {
  const templates = useContext(TemplatesContext)

  const handleSelect = (template: TemplateDefinition) => {
    // Clone the project with a fresh id so concurrent edits don't collide
    const fresh: Project = {
      ...template.project,
      id: generateId(),
      blocks: template.project.blocks.map((b) => ({ ...b, id: generateId() })),
    }
    onSelect(fresh)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-4 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Templates</h2>
            <p className="text-xs text-gray-500 mt-0.5">Choose a starting point — it will replace your current project</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {templates.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-gray-400">
              <p className="text-sm">No templates available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {templates.map((template, i) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  index={i}
                  onSelect={() => handleSelect(template)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
