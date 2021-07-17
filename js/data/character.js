import ImageHelper from '../helpers/image.js'

export default class Character {
  constructor(name, spriteInfo) {
    this.name = name
    this.spriteInfo = spriteInfo

    this.sprites = {
      loaded: false,
      standing: [],
      walking: []
    }

    this.health = 100
    this.energy = 75
    this.fear = 0
  }
  async loadSprites() {
    for (const item of this.spriteInfo) {
      this.sprites.standing.push(await ImageHelper.loadImage(item))
    }
    this.updateSprite()
    this.sprites.loaded = true
  }
  updateSprite(category = 'standing') {
    this.sprites.selected = this.sprites[category][Math.floor(Math.random() * this.sprites[category].length)]
  }
}
