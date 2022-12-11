import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Position, Vector2 } from 'classes'
import { ANIMATION_DURATION, setCssConst, WS_URL } from 'core/const'
import { Events, Send, Emitter } from 'classes'

const createWS = (id: string) => {
  const server = new WebSocket(WS_URL)
  const send: Send = (type, payload) => server.send(JSON.stringify({ type, payload }))
  window.addEventListener('beforeunload', () => server.close())

  const emitter = new Emitter()

  server.onopen = function () {
    send('INIT_CLIENT', { id })
  }

  server.onmessage = event => {
    try {
      const { data } = event
      const parsedEvent = JSON.parse(data) as Events
      emitter.emit(parsedEvent)
      console.debug(parsedEvent)
    } catch (err) {
      console.error(err)
    }
  }

  return { send, emitter }
}

export const { send, emitter } = createWS(uuidv4())

const useEngine = () => {
  const direction = useRef<Vector2>(null)
  const [loading, setLoading] = useState(true)
  const [entities, setEntities] = useState<Entity[]>([])
  emitter.subscribe('INIT_SERVER', ({ board, players }) => {
    setEntities(players.map(player => player.entity))
    setCssConst(board.x, board.y)
    setLoading(false)
  })

  emitter.subscribe('TICK', ({ players }) => setEntities(players.map(player => player.entity)))

  // useEffect(() => {
  //   const keyDownCallback = (e: KeyboardEvent) => {
  //     switch (e.key) {
  //       case 'a':
  //         setDirection(entities[0].id, new Vector2(-1, 0))
  //         break
  //       case 'd':
  //         setDirection(entities[0].id, new Vector2(1, 0))
  //         break
  //       case 'w':
  //         setDirection(entities[0].id, new Vector2(0, -1))
  //         break
  //       case 's':
  //         setDirection(entities[0].id, new Vector2(0, 1))
  //         break
  //     }
  //   }

  //   window.addEventListener('keydown', keyDownCallback)
  //   return () => window.removeEventListener('keydown', keyDownCallback)
  // }, [entities, setDirection])

  return { entities, loading }
}

export default useEngine
