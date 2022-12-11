import React, { useContext, ReactNode } from 'react'
import useEngine, { send, emitter } from 'core/useEngine'

type EngineContextType = Partial<ReturnType<typeof useEngine>> & {
  send: typeof send
  emitter: typeof emitter
}

const EngineContext = React.createContext<EngineContextType>({
  send,
  emitter,
})

const EngineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const engineValues = useEngine()

  return (
    <EngineContext.Provider value={{ ...engineValues, send, emitter }}>
      {children}
    </EngineContext.Provider>
  )
}

export default EngineProvider

export const useEngineContext = (): EngineContextType => {
  return useContext(EngineContext)
}
