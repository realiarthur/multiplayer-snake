import React, { useContext, ReactNode } from 'react'
import useEngine from 'core/useEngine'

type EngineContextType = Partial<ReturnType<typeof useEngine>>

const EngineContext = React.createContext<EngineContextType>({})

const EngineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const engineValues = useEngine()

  return <EngineContext.Provider value={{ ...engineValues }}>{children}</EngineContext.Provider>
}

export default EngineProvider

export const useEngineContext = (): EngineContextType => {
  return useContext(EngineContext)
}
