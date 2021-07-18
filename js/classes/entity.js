import ImageHelper from '../helpers/image.js'

export default class Entity {
  constructor(spriteInfo, position) {
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

    this.position = new Float32Array(position)
    this.movement = new Float32Array([0, 0])
    this.randomOffset = 0
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
  updateIdleSprite() {
    if (this.sprites['idle'].length == 0 || this.movement[0] != 0 || this.movement[1] != 0) return
    if (this.sprites['idle'].length > 1)   this.sprites.selected = this.sprites['idle'][Math.floor(Math.random() * this.sprites['idle'].length)]
    else this.sprites.selected = this.sprites['idle'][0]
    this.randomOffset = Math.round(Math.random())
  }
  getOffset(scale) {
    return this.randomOffset * scale
  }
}
