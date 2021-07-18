import ImageHelper from '../helpers/image.js'

export default class Character {
  constructor(name, spriteInfo, position = [-3550, -3165]) {
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
    this.movement = new Int8Array([0, 0])
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
  updateRandomSprite(category = 'idle') {
    if (this.sprites[category].length == 0) return
    if (this.sprites[category].length > 1)   this.sprites.selected = this.sprites[category][Math.floor(Math.random() * this.sprites[category].length)]
    else this.sprites.selected = this.sprites[category][0]
  }
  chooseMatchingSprite() {
    if (this.movement[1] == 1) this.updateSprite('up')
    else if (this.movement[1] == -1) this.updateSprite('down')
    else if (this.movement[0] == 1) this.updateSprite('left')
    else if (this.movement[0] == -1) this.updateSprite('right')
  }
  move(ctx) {
    const newPosX = ctx.getImageData(-this.position[0] - this.movement[0], -this.position[1], 1, 1).data
    const newPosY = ctx.getImageData(-this.position[0], -this.position[1] - this.movement[1], 1, 1).data
    if (newPosX[0] == 0 && newPosX[2] == 0) this.position[0] += this.movement[0]
    else if (newPosX[2] != 0) this.position[0] += this.movement[0] * .5
    if (newPosY[0] == 0 && newPosY[2] == 0) this.position[1] += this.movement[1]
    else if (newPosY[2] != 0) this.position[1] += this.movement[1] * .5
  }
}
