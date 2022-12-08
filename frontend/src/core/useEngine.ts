import { useEffect, useRef, useState } from 'react'
import { Snake, Position, Vector2 } from 'classes'
import { ANIMATION_DURATION, BOARD_WIDTH, BOARD_HEIGHT } from 'core/const'

const entitiesInit: Snake[] = [
  new Snake({
    id: '1',
    direction: new Vector2(0, 1),
    position: new Position([
      new Vector2(0, 6),
      new Vector2(0, 5),
      new Vector2(0, 4),
      new Vector2(0, 3),
      new Vector2(0, 2),
      new Vector2(0, 1),
      new Vector2(0, 0),
    ]),
  }),
]

const useBackendEngine = () => {
  const [entities, setEntities] = useState(entitiesInit)

  useEffect(() => {
    setTimeout(() => {
      const newEntites = entities.map(entity => {
        if (entity.type === 'player') {
          return entity.tick(new Vector2(BOARD_WIDTH, BOARD_HEIGHT))
        } else {
          return entity
        }
      })

      setEntities(newEntites)
    }, ANIMATION_DURATION)
  }, [entities])

  const setDirection = (id: string, direction: Vector2) => {
    entities.find(entity => entity.id === id)?.updateDirection(direction)
  }

  // }(direction.current = d)
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
          setDirection(entities[0].id, new Vector2(-1, 0))
          break
        case 'd':
          setDirection(entities[0].id, new Vector2(1, 0))
          break
        case 'w':
          setDirection(entities[0].id, new Vector2(0, -1))
          break
        case 's':
          setDirection(entities[0].id, new Vector2(0, 1))
          break
      }
    }

    window.addEventListener('keydown', keyDownCallback)
    return () => window.removeEventListener('keydown', keyDownCallback)
  }, [entities, setDirection])

  return { entities }
}

export default useEngine
