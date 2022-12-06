/**
 * Generate random integer number
 * @param max Generation boundary
 * @returns Integer number from [0 to max)
 */
export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max)
}

export class Vector2 {
  x: number
  y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  /**
   * Get random cell in area
   * @param area Boundary
   * @returns Return new instance of Vector2 with random coordinates
   */
  static random(area: Vector2): Vector2 {
    return new Vector2(getRandomInt(area.x), getRandomInt(area.y))
  }

  /**
   * Get opposite vector
   * @returns Opposite (about 0;0) vector  to this
   */
  opposite(): Vector2 {
    return new Vector2(-this.x, -this.y)
  }

  add(x?: number, y?: number): Vector2
  add(vector: Vector2): Vector2
  /**
   * Summation of vectors
   * @param args vector or coordinates to summate with this
   * @returns New instance of Vector2 which sums up argument and this
   */
  add(...args: [Vector2] | [number?, number?]): Vector2 {
    if (args[0] instanceof Vector2) {
      return new Vector2(this.x + args[0].x, this.y + args[0].y)
    }

    return new Vector2(this.x + (args[0] ?? 0), this.y + (args[1] ?? 0))
  }

  /**
   * Check vector equality
   * @param vector Vector to check
   * @returns True if vectors represent same point
   */
  equal(vector: Vector2): boolean {
    return this.x === vector.x && this.y === vector.y
  }
}
