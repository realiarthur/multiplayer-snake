import { Entity } from './Entity'
import { Position } from './Position'
import { Vector2 } from './Vector2'

type PlayerProps = {
  id: string
  direction: Vector2
  position?: Position
}

export class Player {
  id: string
  direction: Vector2
  entity: Entity

  // this props used to remember direction to update at next tick
  // direction should only updates by ticks to prevent slipage
  private directionsQueue: Vector2[]

  constructor({ id, direction, position }: PlayerProps) {
    this.id = id
    this.direction = direction
    this.entity = new Entity({ position, type: 'player' })
    this.directionsQueue = []
  }

  updateDirection(direction: Vector2): void {
    this.directionsQueue.push(direction)
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


  private setDirection(direction: Vector2): void {
    if (direction.equal(this.direction) || direction.equal(this.direction.opposite())) {
      return
    }

    this.direction = direction
  }
}
