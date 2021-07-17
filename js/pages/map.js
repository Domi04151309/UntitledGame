import Menu from '../components/menu.js'
import Stats from '../components/stats.js'

const FRAMERATE = 60
const DISTANCE_PER_FRAME = 20 / FRAMERATE
const FRAME_DURATION = 1000 / FRAMERATE

export default {
  name: 'map',
  data() {
    return {
      running: null,
      ctx: null,
      map: null,
      steve: null,
      scale: 10,
      x: -120,
      y: -430,
      movement: [0, 0]
    }
  },
  template:
  `<div>
    <Menu></Menu>
    <main class="full-height">
      <Stats></Stats>
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
    },
    onKeyUp(event) {
      if (event.keyCode == 87 || event.keyCode == 83) this.movement[1] = 0
      else if (event.keyCode == 65 || event.keyCode == 68) this.movement[0] = 0
    },
    onWheel(event) {
      if (event.deltaY > 0 && this.scale > 4) this.scale -= 1
      else if (event.deltaY < 0 && this.scale < 40) this.scale += 1
    },
    windowResize() {
      this.$refs.canvas.width = window.innerWidth
      this.$refs.canvas.height = window.innerHeight
    },
    loadMap() {
      return new Promise((resolve, reject) => {
        this.map = new Image()
        this.map.onload = resolve
        this.map.onerror = reject
        this.map.src = './images/map.png'
      })
    },
    loadSteve() {
      return new Promise((resolve, reject) => {
        this.steve = new Image()
        this.steve.onload = resolve
        this.steve.onerror = reject
        this.steve.src = './images/steve.png'
      })
    },
    async drawMap() {
      if (this.ctx == null) this.ctx = this.$refs.canvas.getContext('2d')
      if (this.map == null) await this.loadMap()
      if (this.steve == null) await this.loadSteve()

      this.ctx.fillStyle = '#0D47A1'
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
        this.steve,
        (window.innerWidth - this.steve.width * this.scale) / 2,
        window.innerHeight / 2 - this.steve.height * this.scale,
        this.scale * this.steve.width,
        this.scale * this.steve.height
      )
      //console.log(this.x + ' ' + this.y)
    }
  },
  created() {
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
    document.addEventListener('wheel', this.onWheel)
    window.addEventListener('resize', this.windowResize)

    if (this.running == null) {
      this.running = setInterval(() => {
        this.x += this.movement[0] * DISTANCE_PER_FRAME
        this.y += this.movement[1] * DISTANCE_PER_FRAME
        this.drawMap()
      }, FRAME_DURATION)
    }
  },
  mounted() {
    this.windowResize()
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)
    document.removeEventListener('wheel', this.onWheel)
    window.removeEventListener('resize', this.windowResize)

    if (this.running != null) {
      clearInterval(this.running)
      this.running = null
    }
  }
}
