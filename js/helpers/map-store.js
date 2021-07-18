import ImageHelper from '../helpers/image.js'

export default {
  loaded: false,
  default: null,
  structures: null,
  collision: null,
  offsceen: {
    canvas: null,
    ctx: null
  },
  async load() {
    this.default = await ImageHelper.loadImage('./images/map.png')
    this.structures = await ImageHelper.loadImage('./images/map_structures.png')
    this.collision = await ImageHelper.loadImage('./images/map_collision.png')

    this.offsceen.canvas = new OffscreenCanvas(this.default.width, this.default.height)
    this.offsceen.ctx = this.offsceen.canvas.getContext('2d', { alpha: false })
    this.offsceen.ctx.imageSmoothingEnabled = false
    this.offsceen.ctx.drawImage(
      this.collision,
      0,
      0,
      this.default.width,
      this.default.height
    )

    this.loaded = true
  }
}
