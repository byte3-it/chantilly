import { createContext } from 'react'
import type { FileManagerConfig } from '../../types/fileManager'

export const FileManagerContext = createContext<FileManagerConfig | null>(null)
