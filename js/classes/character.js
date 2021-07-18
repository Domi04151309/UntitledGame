import ImageHelper from '../helpers/image.js'
import Vector from '../classes/vector.js'

const CharacterCompanion = {
  WALKING_SPEED_SLOW: .25,
  WALKING_SPEED_FAST: 1
}

class Character {
  constructor(name, spriteInfo, position = [3550, 3165]) {
    this.name = name
    this.spriteInfo = spriteInfo

    this.sprites = {
      i: 0,
      loaded: false,
      idle: [],
      left: [],
      right: [],
      up: [],
      down: []
    }

    this.health = 100
    this.energy = 75
    this.terror = 0

    this.position = new Float32Array(position)
    this.movement = new Float32Array([0, 0])
    this.speed = CharacterCompanion.WALKING_SPEED_FAST
    this.randomOffset = 0
    this.routeIndex = 0
    this.waypoints = []
  }
  async loadSprites() {
    for (const category in this.spriteInfo) {
      for (const sprite of this.spriteInfo[category]) {
        this.sprites[category].push(await ImageHelper.loadImage(sprite))
      }
    }
    this.updateSprite()
    this.sprites.loaded = true
  }
  updateSprite(category = 'idle') {
    if (this.sprites[category].length == 0) return
    if (this.sprites.i + 1 < this.sprites[category].length) this.sprites.i++
    else this.sprites.i = 0
    this.sprites.selected = this.sprites[category][this.sprites.i]
  }
  updateIdleSprite(category = 'idle') {
    if (this.sprites[category].length == 0) return
    if (this.sprites[category].length > 1)   this.sprites.selected = this.sprites[category][Math.floor(Math.random() * this.sprites[category].length)]
    else this.sprites.selected = this.sprites[category][0]
    this.randomOffset = Math.round(Math.random())
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
