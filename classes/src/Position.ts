import { Vector2 } from './Vector2'

type Cells = Array<{
  key: number
  cell: Vector2
}>

export class Position {
  private cellsKeyCount = 0 // garantee unique key of cells
  cells: Cells = []

  constructor ()
  constructor (vector: Vector2)
  constructor (cells: Cells, cellsKeyCount?: number)
  constructor (x: number, y: number)
  constructor (...args: [] | [Vector2] | [Cells, number?] | [number, number]) {
    if (args.length === 0) {
      this.cells = []
    } else if (args[0] instanceof Vector2) {
      this.push(new Vector2(args[0].x, args[0].y))
    } else if (args[0] instanceof Array) {
      this.cells = args[0]
      this.cellsKeyCount = args[1] ?? 0
    } else {
      this.push(new Vector2(args[0], args[1]))
    }
  }

  /**
   * Add cell to this Position
   * @param cell Cell to be added
   * @returns Same instance of Position
   */
  push (cell: Vector2): this {
    this.cells.push({ key: this.cellsKeyCount++, cell })
    return this
  }

  add (cell: Vector2): Position
  add (position: Position): Position
  /**
   * Add cell or Position.cells to Position
   * @param arg cell or position
   * @returns New instance with all cells
   */
  add (arg: Vector2 | Position): Position {
    const newPosition = new Position([...this.cells], this.cellsKeyCount)
    if (arg instanceof Position) {
      arg.cells.forEach(({ cell }) => newPosition.push(cell))
    } else {
      newPosition.push(arg)
    }

    return newPosition
  }

  /**
   * Remove intersection with another Position
   * @param position Position to intersect
   * @returns Same instance without intersections
   */
  remove (position: Position): this {
    this.cells = this.cells.filter(({ cell }) => !position.intersect(cell))
    return this
  }

  /**
   * Detect intersection woth area
   * @param area Position or cell to intersect
   * @returns True if some of cells intersect and false if not
   */
  intersect (area: Position | Vector2): boolean {
    if (area instanceof Vector2) {
      return this.cells.findIndex(({ cell }) => area.equal(cell)) > -1
    }
    return this.cells.findIndex(({ cell }) => area.intersect(cell)) > -1
  }

  /**
   * Fix this cells intu area (board) шf they are overboard
   * @param param0 area Boundary for reflection
   * @returns Same instance with  reflect cells onboard
   */
  fixReflection ({ x: hSize, y: vSize }: Vector2): this {
    this.cells.forEach(({ cell }) => {
      if (cell.x < 0) cell.x += hSize
      if (cell.x >= hSize) cell.x -= hSize
      if (cell.y < 0) cell.y += vSize
      if (cell.y >= vSize) cell.y -= vSize
    })
    return this
  }

  /**
   * Move and return new position with same keys and moved cells
   * @param vector Moved vector
   * @returns New instanse with all cells moved by vector
   */
  move (vector: Vector2): Position {
    const cells = this.cells.map(({ key, cell }) => ({
      key,
      cell: cell.add(vector)
    }))

    return new Position(cells, this.cellsKeyCount)
  }
}