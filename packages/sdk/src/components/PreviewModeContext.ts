import { createContext } from 'react'

export type PreviewMode = 'desktop' | 'mobile'

export const PreviewModeContext = createContext<PreviewMode>('desktop')
