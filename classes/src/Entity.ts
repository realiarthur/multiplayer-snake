import { Position } from './Position'

type EntityType = 'player' | 'food' | 'wall'

export class Entity {
  id: string
  type: EntityType
  position: Position = new Position()
  trace?: Position

  constructor(props: { id: string; type: EntityType; position?: Position; trace?: Position }) {
    this.id = props.id
    this.type = props.type
    this.position = props.position ?? this.position
    this.trace = props.trace
  }

  /**
   * Set new position to entity
   * @param position New position to set
   * @returns New entity instance
   */
  setPosition(position: Position): Entity {
    return new Entity({ ...this, position })
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
  move(vector: Vector2, area: Vector2): Entity {
    const newPosition = this.position.move(vector).fixReflection(area)

    return new Entity({
      ...this,
      position: newPosition,
      trace: this.trace?.add(this.position),
    })
  }
}
