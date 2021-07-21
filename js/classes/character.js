import Entity from './entity.js'
import Vector from './vector.js'
import CoordinateHelper from '../helpers/coordinates.js'

import MapStore from '../helpers/map-store.js'
import DialogView from '../helpers/dialog-view.js'

const CharacterCompanion = {
  WALKING_SPEED_SLOW: .25,
  WALKING_SPEED_NORMAL: 1,
  WALKING_SPEED_FAST: 2
}

class Character extends Entity {
  constructor(name, spriteInfo, position) {
    super(name, spriteInfo, position)
    this.interaction = () => DialogView.show('Narrator', this.name + ' did not answer...')

    this.data = {
      health: 100,
      energy: 75,
      terror: 0
    }

    this.randomOffset = 0
    this.movement = new Int8Array([0, 0])
    this.speed = CharacterCompanion.WALKING_SPEED_NORMAL
    this.routeIndex = 0
    this.waypoints = []
  }
  updateIdleSprite() {
    if (this.sprites['idle'].length == 0 || this.movement[0] != 0 || this.movement[1] != 0) return
    super.updateIdleSprite()
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
  move() {
    const vector = new Vector(...this.movement)
    const movement = vector.normalize().multiply(this.speed).toArray()

    const newPosX = MapStore.offsceen.ctx.getImageData(this.position[0] + movement[0], this.position[1], 1, 1).data
    const newPosY = MapStore.offsceen.ctx.getImageData(this.position[0], this.position[1] + movement[1], 1, 1).data

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
  generateRandomPath(amount) {
    const waypoints = []
    let lastPoint = this.position

    for (let i = 0; i < amount / 2 - 1; i++) {
      const point = CoordinateHelper.randomPositionNearby(lastPoint, 50)
      waypoints.push(point)
      lastPoint = point
    }
    this.addToWalkPath(...waypoints, ...waypoints.reverse(), this.position)
  }
  followPath() {
    if (this.waypoints.length == 0) return

    const distance = this.position[0] - this.waypoints[this.routeIndex][0] + this.position[1] - this.waypoints[this.routeIndex][1]
    if (distance >= -2 && distance <= 2) {
      if (this.waypoints.length > this.routeIndex + 1) this.routeIndex++
      else this.routeIndex = 0
    }

    const vector = new Vector(this.waypoints[this.routeIndex][0] - this.position[0], this.waypoints[this.routeIndex][1] - this.position[1])
    this.movement = vector.normalize().toArray().map(x => Math.round(x))
    this.move(MapStore.offsceen.ctx)
  }
}

export {CharacterCompanion, Character}
