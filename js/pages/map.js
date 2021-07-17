import Menu from '../components/menu.js'

const SCALE = 8

export default {
  name: 'map',
  data() {
    return {
      ctx: null,
      map: null,
      steve: null,
      x: -120,
      y: -430
    }
  },
  template:
  `<div>
    <Menu></Menu>
    <main class="full-height">
      <p class="card tutorial">
        Use WASD to move.
      </p>
      <canvas ref="canvas"></canvas>
    </main>
  </div>`,
  components: {
    Menu
  },
  methods: {
    onKeyDown(event) {
      if (event.keyCode == 87) {
        this.y += 1
        this.drawMap()
      } else if (event.keyCode == 65) {
        this.x += 1
        this.drawMap()
      } else if (event.keyCode == 83) {
        this.y -= 1
        this.drawMap()
      } else if (event.keyCode == 68) {
        this.x -= 1
        this.drawMap()
      }
    },
    windowResize() {
      this.$refs.canvas.width = window.innerWidth
      this.$refs.canvas.height = window.innerHeight
      this.drawMap()
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
        this.x * SCALE + window.innerWidth / 2,
        this.y * SCALE + window.innerHeight / 2,
        SCALE * this.map.width,
        SCALE * this.map.height
      )
      this.ctx.drawImage(
        this.steve,
        (window.innerWidth - this.steve.width * SCALE) / 2,
        window.innerHeight / 2 - this.steve.height * SCALE,
        SCALE * this.steve.width,
        SCALE * this.steve.height
      )
      console.log(this.x + ' ' + this.y)
    }
  },
  created() {
    document.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('resize', this.windowResize)
  },
  mounted() {
    this.windowResize()
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('resize', this.windowResize);
  }
}
