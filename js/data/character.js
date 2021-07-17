import ImageHelper from '../helpers/image.js'

export default class Character {
  constructor(name, spriteInfo) {
    this.name = name
    this.spriteInfo = spriteInfo

    this.sprites = {
      loaded: false,
      default: [],
      left: [],
      right: [],
      up: []
    }

    this.health = 100
    this.energy = 75
    this.fear = 0
  }
  async loadSprites() {
    for (const category in this.spriteInfo) {
      for (const sprite of this.spriteInfo[category]) {
        this.sprites[category].push(await ImageHelper.loadImage(sprite))
      }
    }
    console.log(this.sprites)
    this.updateSprite()
    this.sprites.loaded = true
  }
  updateSprite(category = 'default') {
    if (this.sprites[category].length > 1) {
      this.sprites.selected = this.sprites[category][Math.floor(Math.random() * this.sprites[category].length)]
    } else {
      this.sprites.selected = this.sprites[category][0]
    }
  }
}
