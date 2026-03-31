import type { Project } from '../types/project'
import { exportToHtml } from './exportToHtml'
import { exportToEmail } from './exportToEmail'

export function exportProject(project: Project): string {
  return project.mode === 'email' ? exportToEmail(project) : exportToHtml(project)
}
