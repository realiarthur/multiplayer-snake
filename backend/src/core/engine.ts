import { Events, Send, Vector2, Entity } from 'classes'
import config from './config'
import state from './state'

const { SCORE_COUNT, TICK_DURATION } = config

export const onMessage = (event: Events, send: Send, playerId: string) => {
  const { type, payload } = event

  switch (type) {
    case 'INIT_CLIENT': {
      state.addPlayer(payload.id)
      const { board, getEntities } = state
      send('INIT_SERVER', { board, entities: getEntities(), TICK_DURATION })
      break
    }
    case 'SET_DIRECTION': {
      const player = state.getPlayer(playerId)
      if (!player) return
      player.updateDirection(new Vector2(payload.direction))
    }
  }
}

export const onClose = (playerId: string) => {
  state.removePlayer(playerId)
}

const performTick = () => {
  let { players, board } = state

  players = players.map(player => player.tick(board))

  const entities = state.getEntities()

  players.forEach(player => {
    const snakeHead = player.entity.position.cells[0]
    const intersectEntities = entities.reduce<Entity[]>((result, entitiy) => {
      if (entitiy.position.intersect(snakeHead)) {
        result.push(entitiy)
      }
      return result
    }, [])

    if (intersectEntities.length === 1) {
      const { type } = intersectEntities[0]
      if (type === 'food') {
        player.addScore(SCORE_COUNT)
      }
    }
  })

  // TODO: Optimization: food could be sent only when changed
  return { entities }
}

export const start = (send: Send) => {
  const tickInterval = setInterval(() => {
    const data = performTick()
    send('TICK', data)
  }, TICK_DURATION)
  return () => clearInterval(tickInterval)
}
