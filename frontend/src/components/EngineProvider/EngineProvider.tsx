import React, { useContext, ReactNode } from 'react'
import useEngine, { UseEngineReturns } from 'core/useEngine'

const EngineContext = React.createContext<UseEngineReturns>({
  entities: [],
})

const EngineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const engineValues = useEngine()

  return <EngineContext.Provider value={engineValues}>{children}</EngineContext.Provider>
}

export default EngineProvider

export const useEngineContext = (): UseEngineReturns => {
  return useContext(EngineContext)
}
