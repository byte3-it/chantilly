import React from 'react'
import { X } from 'lucide-react'
import { useBuilderStore } from '../../store/builderStore'
import { DEFAULT_PROJECT_SETTINGS } from '../../types/project'
import { ColorField } from '../ui/ColorField'
import { Input } from '../ui/Input'

interface Props {
  onClose: () => void
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  )
}

export function ProjectSettingsPanel({ onClose }: Props) {
  const { project, updateProject, updateSettings } = useBuilderStore()
  const settings = { ...DEFAULT_PROJECT_SETTINGS, ...project.settings }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">Project Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body — two columns */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            {/* Left — General */}
            <div className="flex flex-col gap-6 p-6">
              <Section title="General">
                <Input
                  label="Project Name"
                  value={project.name}
                  onChange={(e) => updateProject({ name: e.target.value })}
                />
              </Section>

              <Section title="SEO / Meta">
                <Input
                  label="Page Title"
                  value={project.meta.title}
                  onChange={(e) =>
                    updateProject({ meta: { ...project.meta, title: e.target.value } })
                  }
                  placeholder="My Landing Page"
                />
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600">Description</label>
                  <textarea
                    value={project.meta.description}
                    onChange={(e) =>
                      updateProject({ meta: { ...project.meta, description: e.target.value } })
                    }
                    rows={3}
                    placeholder="A short description of your page"
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                </div>
                <Input
                  label="Language"
                  value={project.meta.lang}
                  onChange={(e) =>
                    updateProject({ meta: { ...project.meta, lang: e.target.value } })
                  }
                  placeholder="en"
                />
              </Section>
            </div>

            {/* Right — Appearance */}
            <div className="flex flex-col gap-6 p-6">
              <Section title="Background">
                <ColorField
                  label="Page Background"
                  value={settings.backgroundColor}
                  onChange={(color) => updateSettings({ backgroundColor: color })}
                />
              </Section>

              <Section title="Primary Button">
                <ColorField
                  label="Background"
                  value={settings.primaryColor}
                  onChange={(color) => updateSettings({ primaryColor: color })}
                />
                <ColorField
                  label="Text"
                  value={settings.primaryTextColor}
                  onChange={(color) => updateSettings({ primaryTextColor: color })}
                />
              </Section>

              <Section title="Secondary Button">
                <ColorField
                  label="Background"
                  value={settings.secondaryColor}
                  onChange={(color) => updateSettings({ secondaryColor: color })}
                />
                <ColorField
                  label="Text"
                  value={settings.secondaryTextColor}
                  onChange={(color) => updateSettings({ secondaryTextColor: color })}
                />
                <ColorField
                  label="Border"
                  value={settings.secondaryBorderColor}
                  onChange={(color) => updateSettings({ secondaryBorderColor: color })}
                />
              </Section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
