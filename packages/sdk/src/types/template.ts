import type { Project } from './project'

export interface TemplateDefinition {
  id: string
  name: string
  description?: string
  thumbnail?: string
  project: Project
}
