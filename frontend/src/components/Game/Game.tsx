import React from 'react'
import Board from 'components/Board'
import EngineProvider from 'components/EngineProvider'

import s from './style.module.css'

const Game: React.FC = () => {
  return (
    <div className={s.game}>
      <h1 className={s.title}>Multiplayer Snake</h1>
      <EngineProvider>
        <Board />
      </EngineProvider>
    </div>
  )
}

export default Game
