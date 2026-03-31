import { createContext, useContext } from 'react'

export const ReadOnlyContext = createContext<boolean>(false)

export function useReadOnly(): boolean {
  return useContext(ReadOnlyContext)
}
