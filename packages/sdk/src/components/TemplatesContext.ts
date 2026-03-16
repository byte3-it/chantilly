import { createContext } from 'react'
import type { TemplateDefinition } from '../types/template'

export const TemplatesContext = createContext<TemplateDefinition[]>([])
