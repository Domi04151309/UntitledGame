import Menu from '../components/menu.js'
import Stats from '../components/stats.js'

import Character from '../data/character.js'
import ImageHelper from '../helpers/image.js'

const FRAMERATE = 60
const DISTANCE_PER_FRAME = 5 * 8 / FRAMERATE
const FRAME_DURATION = 1000 / FRAMERATE
const ENTITY_SIZE = 16

export default {
  name: 'map',
  data() {
    return {
      drawingThread: null,
      ctx: null,
      map: null,
      character: null,
      scale: 5,
      x: -1360,
      y: -870,
      movement: [0, 0],
      frameCounter: 0,
      randomOffset: 0,
      drawing: false
    }
  },
  template:
  `<div>
    <Menu></Menu>
    <main class="full-height">
      <Stats :character="character"></Stats>
      <p class="card tutorial">
        Use WASD to move
      </p>
      <canvas ref="canvas"></canvas>
    </main>
  </div>`,
  components: {
    Menu,
    Stats
  },
  methods: {
    onKeyDown(event) {
      if (event.keyCode == 87) this.movement[1] = 1
      else if (event.keyCode == 65) this.movement[0] = 1
      else if (event.keyCode == 83) this.movement[1] = -1
      else if (event.keyCode == 68) this.movement[0] = -1
      else if (event.keyCode == 80) console.log({ x: Math.round(this.x), y: Math.round(this.y), scale: Math.round(this.scale) })
    },
    onKeyUp(event) {
      if (event.keyCode == 87 || event.keyCode == 83) this.movement[1] = 0
      else if (event.keyCode == 65 || event.keyCode == 68) this.movement[0] = 0
    },
    onWheel(event) {
      if (event.deltaY > 0 && this.scale > 1) this.scale -= 1
      else if (event.deltaY < 0 && this.scale < 20) this.scale += 1
    },
    windowResize() {
      this.$refs.canvas.width = window.innerWidth
      this.$refs.canvas.height = window.innerHeight
    },
    async drawMap() {
      if (this.drawing) return

      this.drawing = true
      if (this.ctx == null) this.ctx = this.$refs.canvas.getContext('2d')
      if (this.map == null) this.map = await ImageHelper.loadImage('./images/map.png')
      if (!this.character.sprites.loaded) await this.character.loadSprites()

      this.ctx.fillStyle = '#1C50F1'
      this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      this.ctx.imageSmoothingEnabled = false
      this.ctx.drawImage(
        this.map,
        this.x * this.scale + window.innerWidth / 2,
        this.y * this.scale + window.innerHeight / 2,
        this.scale * this.map.width,
        this.scale * this.map.height
      )
      this.ctx.drawImage(
        this.character.sprites.selected,
        (window.innerWidth - ENTITY_SIZE * this.scale) / 2 + this.randomOffset,
        window.innerHeight / 2 - ENTITY_SIZE * this.scale,
        this.scale * ENTITY_SIZE,
        this.scale * ENTITY_SIZE
      )

      this.frameCounter++
      if (this.frameCounter > FRAMERATE * 2) {
        this.frameCounter = 0
        this.randomOffset = Math.round(Math.random() * 4)
        this.character.updateSprite()
      }

      this.drawing = false
    }
  },
  created() {
    this.character = new Character('Steve', ['./images/steve/0.png', './images/steve/1.png'])

    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
    document.addEventListener('wheel', this.onWheel)
    window.addEventListener('resize', this.windowResize)

    this.drawingThread = setInterval(() => {
      this.x += this.movement[0] * DISTANCE_PER_FRAME
      this.y += this.movement[1] * DISTANCE_PER_FRAME
      this.drawMap()
    }, FRAME_DURATION)
  },
  mounted() {
    this.windowResize()
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)
    document.removeEventListener('wheel', this.onWheel)
    window.removeEventListener('resize', this.windowResize)

    clearInterval(this.drawingThread)
  }
}
