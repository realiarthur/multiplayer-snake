import { Entity, IEntity } from './Entity'
import { Position } from './Position'
import { Vector2 } from './Vector2'

type SnakeProps = {
  id: string
  direction: Vector2
  position?: Position
}

export class Snake extends Entity implements IEntity {
  direction: Vector2

  // this props used to remember direction to update at next tick
  // direction should only updates by ticks to prevent slipage
  private directionsQueue: Vector2[]

  constructor({ direction, ...props }: SnakeProps) {
    super({ ...props, type: 'player' })
    this.direction = direction
    this.directionsQueue = []
  }

  updateDirection(direction: Vector2): void {
    this.directionsQueue.push(direction)
  }

  tick(area: Vector2): Snake {
    this.move(this.direction, area)

    const [newDirection, ...queue] = this.directionsQueue
    if (newDirection) {
      this.setDirection(newDirection)
      this.directionsQueue = queue
    }

    // todoc ??
    return this
  }

  /**
   * Move entity position by vector
   *
   * @param vector Moved vector
   * @param area Area for fix reflections
   * @returns New Entity instance with new Position instance
   */
  private move(vector: Vector2, area: Vector2): void {
    this.position = this.position.move(vector).fixReflection(area)
  }

  private setDirection(direction: Vector2): void {
    if (direction.equal(this.direction) || direction.equal(this.direction.opposite())) {
      return
    }

    this.direction = direction
  }
}
