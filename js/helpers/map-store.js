import ImageHelper from '../helpers/image.js'

export default {
  loaded: false,
  default: null,
  structuresTop: null,
  structuresBottom: null,
  collision: null,
  offsceen: {
    canvas: null,
    ctx: null
  },
  async load() {
    if (!this.loaded) {
      this.default = await ImageHelper.loadImage('map.png')
      this.structuresTop = await ImageHelper.loadImage('map_structures_top.png')
      this.structuresBottom = await ImageHelper.loadImage('map_structures_bottom.png')
      this.collision = await ImageHelper.loadImage('map_collision.png')

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
}
