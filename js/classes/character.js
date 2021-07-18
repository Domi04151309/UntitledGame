import Entity from './entity.js'
import Vector from './vector.js'

const CharacterCompanion = {
  WALKING_SPEED_SLOW: .25,
  WALKING_SPEED_FAST: 1
}

class Character extends Entity {
  constructor(name, spriteInfo, position) {
    super(spriteInfo, position)
    this.name = name

    this.health = 100
    this.energy = 75
    this.terror = 0

    this.speed = CharacterCompanion.WALKING_SPEED_FAST
    this.routeIndex = 0
    this.waypoints = []
  }
  chooseMatchingSprite() {
    if (this.movement[1] == -1) this.updateSprite('up')
    else if (this.movement[1] == 1) this.updateSprite('down')
    else if (this.movement[0] == -1) this.updateSprite('left')
    else if (this.movement[0] == 1) this.updateSprite('right')
  }
  getOffset(scale) {
    return this.movement[0] == 0 && this.movement[1] == 0 ? this.randomOffset * scale : 0
  }
  move(ctx) {
    const vector = new Vector(...this.movement)
    const movement = vector.normalize().multiply(this.speed).toArray()

    const newPosX = ctx.getImageData(this.position[0] + movement[0], this.position[1], 1, 1).data
    const newPosY = ctx.getImageData(this.position[0], this.position[1] + movement[1], 1, 1).data

    if (newPosX[0] == 0 && newPosX[2] == 0) this.position[0] += movement[0]
    else if (newPosX[2] != 0) this.position[0] += movement[0] * .5
    if (newPosY[0] == 0 && newPosY[2] == 0) this.position[1] += movement[1]
    else if (newPosY[2] != 0) this.position[1] += movement[1] * .5
  }
  resetWalkPath() {
    this.waypoints = []
  }
  addToWalkPath(...waypoints) {
    waypoints.forEach(waypoint => this.waypoints.push(waypoint))
  }
  followPath(ctx) {
    if (this.waypoints.length == 0) return

    const distance = this.position[0] - this.waypoints[this.routeIndex][0] + this.position[1] - this.waypoints[this.routeIndex][1]
    if (distance >= -2 && distance <= 2) {
      if (this.waypoints.length > this.routeIndex + 1) this.routeIndex++
      else this.routeIndex = 0
    }

    const vector = new Vector(this.waypoints[this.routeIndex][0] - this.position[0], this.waypoints[this.routeIndex][1] - this.position[1])
    this.movement = vector.normalize().toArray().map(x => Math.round(x))
    this.move(ctx)
  }
}

export {CharacterCompanion, Character}
