import { Entity, Player, Position, Vector2 } from 'classes'
import config from './config'

const { BOARD_WIDTH, BOARD_HEIGHT, FOOD_COUNT, DIRECTION_QUEUE_LENGTH } = config

class State {
  board: Vector2
  players: Player[]
  food: Entity[]

  constructor() {
    this.board = new Vector2(BOARD_WIDTH, BOARD_HEIGHT) // TODO: можно делать большую доску и небольшую область, либо туман войны
    this.players = []

    // TODO: check intersect
    this.food = Array.from(
      { length: FOOD_COUNT },
      () => new Entity({ type: 'food', position: new Position(Vector2.random(this.board)) }),
    )
  }

  addPlayer(id: string) {
    // TODO add interception check
    const randomPoint = Vector2.random(this.board)
    const direction = new Vector2(0, -1)
    const position = new Position(randomPoint)
    const player = new Player({ id, direction, position, DIRECTION_QUEUE_LENGTH })
    this.players.push(player)
  }
  removePlayer(id: string) {
    this.players = this.players.filter(c => c.id !== id)
  }
  getPlayer(id: string): Player | undefined {
    return this.players.find(c => c.id === id)
  }

  getEntities = () => {
    return [...this.players.map(player => player.entity), ...this.food]
  }
}

export default new State()
