import { Position } from './Position'

type EntityType = 'player' | 'food' | 'wall'
type EntityProps = { type: EntityType; position?: Position }

export class Entity {
  type: EntityType
  position: Position = new Position()

  constructor({ type, position }: EntityProps) {
    this.type = type
    this.position = position ?? this.position
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
   * Move entity position by vector
   *
   * @param vector Moved vector
   * @param area Area for fix reflections
   * @returns New Entity instance with new Position instance
   */
  move(vector: Vector2, area: Vector2): void {
    this.position = this.position.move(vector).fixReflection(area)
  }
}
