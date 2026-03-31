import { create } from 'zustand'
import type { Block, BlockType, Project, ProjectSettings } from '../types/project'
import { DEFAULT_PROJECT_SETTINGS } from '../types/project'
import { createDefaultBlock } from '../lib/blockDefaults'
import { generateId } from '../lib/generateId'
import { exportProject } from '../export/exportProject'

const MAX_HISTORY = 20

const defaultProject: Project = {
  id: generateId(),
  name: 'Untitled Project',
  mode: 'web',
  meta: {
    title: 'My Landing Page',
    description: '',
    lang: 'en',
  },
  blocks: [],
}

interface BuilderState {
  project: Project
  selectedBlockId: string | null
  history: Project[]
  selectBlock: (id: string | null) => void
  addBlock: (type: BlockType, afterId?: string) => void
  addBlockDirect: (block: Block, afterId?: string) => void
  removeBlock: (id: string) => void
  moveBlock: (id: string, toIndex: number) => void
  updateBlock: (id: string, patch: Partial<Block>) => void
  updateProject: (patch: Partial<Omit<Project, 'blocks'>>) => void
  updateSettings: (patch: Partial<ProjectSettings>) => void
  undo: () => void
  loadProject: (project: Project) => void
  exportHtml: () => string
}

function pushHistory(history: Project[], project: Project): Project[] {
  const next = [...history, project]
  if (next.length > MAX_HISTORY) next.shift()
  return next
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  project: defaultProject,
  selectedBlockId: null,
  history: [],

  selectBlock: (id) => set({ selectedBlockId: id }),

  addBlock: (type, afterId) => {
    const { project, history } = get()
    const newBlock = createDefaultBlock(type)
    const blocks = [...project.blocks]
    if (afterId) {
      const idx = blocks.findIndex((b) => b.id === afterId)
      blocks.splice(idx + 1, 0, newBlock)
    } else {
      blocks.push(newBlock)
    }
    set({
      history: pushHistory(history, project),
      project: { ...project, blocks },
      selectedBlockId: newBlock.id,
    })
  },

  addBlockDirect: (block, afterId) => {
    const { project, history } = get()
    const blocks = [...project.blocks]
    if (afterId) {
      const idx = blocks.findIndex((b) => b.id === afterId)
      blocks.splice(idx + 1, 0, block)
    } else {
      blocks.push(block)
    }
    set({
      history: pushHistory(history, project),
      project: { ...project, blocks },
      selectedBlockId: block.id,
    })
  },

  removeBlock: (id) => {
    const { project, history, selectedBlockId } = get()
    set({
      history: pushHistory(history, project),
      project: { ...project, blocks: project.blocks.filter((b) => b.id !== id) },
      selectedBlockId: selectedBlockId === id ? null : selectedBlockId,
    })
  },

  moveBlock: (id, toIndex) => {
    const { project, history } = get()
    const blocks = [...project.blocks]
    const fromIndex = blocks.findIndex((b) => b.id === id)
    if (fromIndex === -1) return
    const [block] = blocks.splice(fromIndex, 1)
    blocks.splice(toIndex, 0, block)
    set({
      history: pushHistory(history, project),
      project: { ...project, blocks },
    })
  },

  updateBlock: (id, patch) => {
    const { project, history } = get()
    set({
      history: pushHistory(history, project),
      project: {
        ...project,
        blocks: project.blocks.map((b) => (b.id === id ? ({ ...b, ...patch } as Block) : b)),
      },
    })
  },

  updateProject: (patch) => {
    const { project, history } = get()
    set({
      history: pushHistory(history, project),
      project: { ...project, ...patch },
    })
  },

  updateSettings: (patch) => {
    const { project, history } = get()
    const current: ProjectSettings = { ...DEFAULT_PROJECT_SETTINGS, ...project.settings }
    set({
      history: pushHistory(history, project),
      project: { ...project, settings: { ...current, ...patch } },
    })
  },

  undo: () => {
    const { history } = get()
    if (history.length === 0) return
    const prev = history[history.length - 1]
    set({
      history: history.slice(0, -1),
      project: prev,
    })
  },

  loadProject: (project) => {
    set({ project, history: [], selectedBlockId: null })
  },

  exportHtml: () => {
    return exportProject(get().project)
  },
}))
