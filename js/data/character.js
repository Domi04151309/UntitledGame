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

    this.position = new Int32Array(position)
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
  updateRandomSprite(category = 'idle') {
    if (this.sprites[category].length > 1) {
      this.sprites.selected = this.sprites[category][Math.floor(Math.random() * this.sprites[category].length)]
    } else {
      this.sprites.selected = this.sprites[category][0]
    }
  }
  updateSprite(category = 'idle') {
    if (this.sprites.i + 1 < this.sprites[category].length) this.sprites.i++
    else this.sprites.i = 0
    this.sprites.selected = this.sprites[category][this.sprites.i]
  }
}
