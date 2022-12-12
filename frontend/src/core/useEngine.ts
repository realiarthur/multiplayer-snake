import { useEffect, useState } from 'react'
import { Vector2 } from 'classes'
import { setCssConst } from 'core/const'
import { send, emitter } from 'core/api'

const useEngine = () => {
  // TODO
  // const directionRef = useRef<Vector2>(null)
  const [loading, setLoading] = useState(true)
  const [entities, setEntities] = useState<Entity[]>([])

  useEffect(() => {
    return emitter.subscribe('INIT_SERVER', ({ board, entities, TICK_DURATION }) => {
      setEntities(entities)
      setCssConst(board.x, board.y, TICK_DURATION)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    return emitter.subscribe('TICK', ({ entities }) => setEntities(entities))
  }, [])

  useEffect(() => {
    const keyDownCallback = (e: KeyboardEvent) => {
      let direction
      switch (e.key) {
        case 'a':
          direction = new Vector2(-1, 0)
          break
        case 'd':
          direction = new Vector2(1, 0)
          break
        case 'w':
          direction = new Vector2(0, -1)
          break
        case 's':
          direction = new Vector2(0, 1)
          break
      }
      if (direction) {
        send('SET_DIRECTION', { direction })
      }
    }

    window.addEventListener('keydown', keyDownCallback)
    return () => window.removeEventListener('keydown', keyDownCallback)
  }, [])

  return { entities, loading }
}

export default useEngine
