import ImageHelper from '../helpers/image.js'
import DialogView from '../helpers/dialog-view.js'

export default class Entity {
  constructor(name, spriteInfo, position) {
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
    this.position = new Float32Array(position)
    this.interaction = () => DialogView.show('Narrator', this.name + ' did not move...')
    this.proximityAction = () => {}
  }
  async loadSprites() {
    if (!this.sprites.loaded) {
      this.sprites = await ImageHelper.loadImages(this.spriteInfo)
      this.updateSprite()
      this.sprites.loaded = true
    }
  }
  updateSprite(category = 'idle') {
    if (this.sprites[category] == null || this.sprites[category]?.length == 0) return
    if (this.sprites.i + 1 < this.sprites[category].length) this.sprites.i++
    else this.sprites.i = 0
    this.sprites.selected = this.sprites[category][this.sprites.i]
  }
  updateIdleSprite() {
    if (this.sprites['idle'].length > 1) this.sprites.selected = this.sprites['idle'][Math.floor(Math.random() * this.sprites['idle'].length)]
    else this.sprites.selected = this.sprites['idle'][0]
  }
  getOffset() {
    return 0
  }
}
