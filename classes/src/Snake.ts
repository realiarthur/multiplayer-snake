import { Entity, IEntity } from './Entity'
import { Position } from './Position'

export class Snake extends Entity implements IEntity {
  trace?: Position

  constructor({ trace, ...props }: { id: string; position?: Position; trace?: Position }) {
    super({ ...props, type: 'player' })
    this.trace = trace
  }

  /**
   * Clear entity trace
   */
  clearTrace(): void {
    if (this.trace !== undefined) {
      delete this.trace
      this.trace = new Position()
    }
  }

  /**
   * Move entity position by vector
   *
   * @param vector Moved vector
   * @param area Area for fix reflections
   * @returns New Entity instance with new Position instance
   */
  move(vector: Vector2, area: Vector2): Snake {
    const newPosition = this.position.move(vector).fixReflection(area)

    return new Snake({
      ...this,
      position: newPosition,
      //   trace: this.trace?.add(this.position),
    })
    return this
  }
}
