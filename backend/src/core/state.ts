import { Player, Position, Vector2 } from 'classes'
import config from './config'

const { BOARD_WIDTH, BOARD_HEIGHT } = config

class State {
  board: Vector2
  players: Player[]

  constructor() {
    this.board = new Vector2(BOARD_WIDTH, BOARD_HEIGHT) // TODO: можно делать большую доску и небольшую область, либо туман войны
    this.players = []
  }

  addPlayer(id: string) {
    // TODO add interception check
    const randomPoint = Vector2.random(this.board)
    const direction = new Vector2(0, -1)
    const position = new Position(randomPoint)
    const player = new Player({ id, direction, position })
    this.players.push(player)
  }
  removePlayer(id: string) {
    this.players = this.players.filter(c => c.id === id)
  }

  tick() {
    this.players = this.players.map(player => player.tick(this.board))
  }
}

export default new State()
