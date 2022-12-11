import React from 'react'
import cx from 'classnames'
import Entity from 'components/Entity'
import { useEngineContext } from 'components/EngineProvider'

import s from './style.module.css'

const Board: React.FC = () => {
  const { entities = [] } = useEngineContext()
  return (
    <div className={s.board}>
      <div className={cx(s.grid)}>
        {Object.entries(entities).map(([type, entity]) => {
          return <Entity key={type} {...entity} />
        })}
      </div>
    </div>
  )
}

export default Board
