import { createContext } from 'react'
import type { CustomBlockDefinition } from '../types/customBlock'

export const CustomBlocksContext = createContext<CustomBlockDefinition[]>([])
