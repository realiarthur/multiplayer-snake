import { Position } from './Position'

type EntityType = 'player' | 'food' | 'wall'

export interface IEntity {
  id: string
  type: EntityType
  position: Position
}

export class Entity implements IEntity {
  id
  type
  position = new Position()

  constructor(props: { id: string; type: EntityType; position?: Position }) {
    this.id = props.id
    this.type = props.type
    this.position = props.position ?? this.position
  }

  /**
   * Set new position to entity
   * @param position New position to set
   * @returns New entity instance
   */
  setPosition(position: Position): Entity {
    return new Entity({ ...this, position })
  }
}
