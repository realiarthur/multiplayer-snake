import { Entity } from './Entity'
import { Position } from './Position'
import { Vector2 } from './Vector2'

type PlayerProps = {
  id: string
  direction: Vector2
  position?: Position
  DIRECTION_QUEUE_LENGTH?: number
}

export class Player {
  id: string
  direction: Vector2
  entity: Entity
  DIRECTION_QUEUE_LENGTH: number
  score: number

  // this props used to remember direction to update at next tick
  // direction should only updates by ticks to prevent slipage
  private directionsQueue: Vector2[]

  constructor({ id, direction, position, DIRECTION_QUEUE_LENGTH = 3 }: PlayerProps) {
    this.id = id
    this.direction = direction
    this.entity = new Entity({ position, type: 'player' })
    this.score = 0
    this.directionsQueue = []
    this.DIRECTION_QUEUE_LENGTH = DIRECTION_QUEUE_LENGTH
  }

  updateDirection(direction: Vector2): void {
    if (this.directionsQueue.length < this.DIRECTION_QUEUE_LENGTH) {
      this.directionsQueue.push(direction)
    }
  }

  tick(area: Vector2): Player {
    this.entity.move(this.direction, area)

    const [newDirection, ...queue] = this.directionsQueue
    if (newDirection) {
      this.setDirection(newDirection)
      this.directionsQueue = queue
    }

    // todoc ??
    return this
  }

  addScore(count: number = 1) {
    for (let index = 0; index < count; index++) {
      this.entity.position.push(new Vector2(this.entity.position.getLastCell()))
    }
  }

  private setDirection(direction: Vector2): void {
    if (direction.equal(this.direction) || direction.equal(this.direction.opposite())) {
      return
    }

    this.direction = direction
  }
}
