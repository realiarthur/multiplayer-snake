import { useEffect, useRef, useState } from 'react'
import { Snake, Position, Vector2 } from 'classes'
import { ANIMATION_DURATION, BOARD_WIDTH, BOARD_HEIGHT } from 'core/const'

const entitiesInit: Entity[] = [
  new Snake({
    id: '1',
    position: new Position([
      { key: 0, cell: new Vector2(0, 6) },
      { key: 1, cell: new Vector2(0, 5) },
      { key: 2, cell: new Vector2(0, 4) },
      { key: 3, cell: new Vector2(0, 3) },
      { key: 4, cell: new Vector2(0, 2) },
      { key: 5, cell: new Vector2(0, 1) },
      { key: 6, cell: new Vector2(0, 0) },
    ], 7),
  }),
]

const useBackendEngine = () => {
  const direction = useRef<Vector2>(new Vector2(0, 1))
  const setDirection = (d: Vector2) => (direction.current = d)

  const [entities, setEntities] = useState(entitiesInit)

  useEffect(() => {
    setTimeout(() => {
      const newEntites = entities.map(entity => {
        if (entity.type === 'player') {
          return entity.move(direction.current, new Vector2(BOARD_WIDTH, BOARD_HEIGHT))
        } else {
          return entity
        }
      })

      setEntities(newEntites)
    }, ANIMATION_DURATION)
  }, [entities, direction])

  return { entities, setDirection }
}

export interface UseEngineReturns {
  entities: Entity[]
}

const useEngine = (): UseEngineReturns => {
  const direction = useRef<Vector2>(null)
  const { entities, setDirection } = useBackendEngine()

  useEffect(() => {
    const keyDownCallback = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'a':
          setDirection(new Vector2(-1, 0))
          break
        case 'd':
          setDirection(new Vector2(1, 0))
          break
        case 'w':
          setDirection(new Vector2(0, -1))
          break
        case 's':
          setDirection(new Vector2(0, 1))
          break
      }
    }

    window.addEventListener('keydown', keyDownCallback)
    return () => window.removeEventListener('keydown', keyDownCallback)
  }, [])

  return { entities }
}

export default useEngine
