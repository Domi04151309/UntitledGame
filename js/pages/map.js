import Menu from '../components/menu.js'
import Stats from '../components/stats.js'
import POverlay from '../components/p-overlay.js'

import Character from '../data/character.js'
import ImageHelper from '../helpers/image.js'

const ENTITY_SIZE = 16

export default {
  name: 'map',
  data() {
    return {
      ctx: null,
      map: null,
      character: null,
      entitiesLoaded: false,
      entities: [],
      scale: 5,
      frameCounter: 0,
      randomOffset: 0,
      drawCompanion: {
        running: true,
        drawing: false,
        lastCalled: 0,
        fps: 0
      }
    }
  },
  template:
  `<div>
    <Menu></Menu>
    <main class="full-height">
      <Stats :character="character"></Stats>
      <POverlay :data="{ i: frameCounter, fps: this.drawCompanion.fps, scale: this.scale, position: this.character.position, movement: this.character.movement }"></POverlay>
      <p class="card tutorial">
        Use WASD to move
      </p>
      <canvas ref="canvas"></canvas>
    </main>
  </div>`,
  components: {
    Menu,
    Stats,
    POverlay
  },
  methods: {
    onKeyDown(event) {
      if (event.keyCode == 87) this.character.movement[1] = 1
      else if (event.keyCode == 65) this.character.movement[0] = 1
      else if (event.keyCode == 83) this.character.movement[1] = -1
      else if (event.keyCode == 68) this.character.movement[0] = -1
    },
    onKeyUp(event) {
      if (event.keyCode == 87 || event.keyCode == 83) this.character.movement[1] = 0
      else if (event.keyCode == 65 || event.keyCode == 68) this.character.movement[0] = 0
    },
    onWheel(event) {
      if (event.deltaY > 0 && this.scale > 1) this.scale -= 1
      else if (event.deltaY < 0 && this.scale < 20) this.scale += 1
    },
    windowResize() {
      this.$refs.canvas.width = window.innerWidth
      this.$refs.canvas.height = window.innerHeight
    },
    async draw(time = 0) {
      if (this.drawCompanion.running) requestAnimationFrame(this.draw)

      if (this.drawCompanion.drawing) return
      this.drawCompanion.drawing = true

      //FPS
      const delta = (time - this.drawCompanion.lastCalled) / 1000
      this.drawCompanion.lastCalled = time
      this.drawCompanion.fps = Math.floor(1 / delta)

      //Character specific logic
      this.character.position[0] += this.character.movement[0]
      this.character.position[1] += this.character.movement[1]

      if (this.character.movement[1] == 1) this.character.updateSprite('up')
      else if (this.character.movement[0] == -1) this.character.updateSprite('right')
      else if (this.character.movement[0] == 1) this.character.updateSprite('left')

      //Init
      if (this.map == null) this.map = await ImageHelper.loadImage('./images/map.png')
      if (!this.character.sprites.loaded) await this.character.loadSprites()
      if (!this.entitiesLoaded) {
        for (const entity of this.entities) {
          await entity.loadSprites()
        }
        this.entitiesLoaded = true
      }

      //Map drawing
      this.ctx.fillStyle = '#1C50F1'
      this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      this.ctx.imageSmoothingEnabled = false
      this.ctx.drawImage(
        this.map,
        this.character.position[0] * this.scale + window.innerWidth / 2,
        this.character.position[1] * this.scale + window.innerHeight / 2,
        this.scale * this.map.width,
        this.scale * this.map.height
      )
      this.entities.forEach(entity => {
        this.ctx.drawImage(
          entity.sprites.selected,
          (this.character.position[0] - entity.position[0] - ENTITY_SIZE / 2) * this.scale + window.innerWidth / 2,
          (this.character.position[1] - entity.position[1] - ENTITY_SIZE) * this.scale + window.innerHeight / 2,
          this.scale * ENTITY_SIZE,
          this.scale * ENTITY_SIZE
        )
      })
      this.ctx.drawImage(
        this.character.sprites.selected,
        (window.innerWidth - ENTITY_SIZE * this.scale) / 2 + this.randomOffset,
        window.innerHeight / 2 - ENTITY_SIZE * this.scale,
        this.scale * ENTITY_SIZE,
        this.scale * ENTITY_SIZE
      )

      //Character specific logic
      this.frameCounter++
      if (this.frameCounter > this.drawCompanion.fps * 2) {
        this.frameCounter = 0
        this.randomOffset = Math.round(Math.random() * 4)
        this.character.updateSprite()
      }

      this.drawCompanion.drawing = false
    }
  },
  created() {
    this.character = new Character('Steve', {
      default: ['./images/steve/0.png', './images/steve/1.png'],
      left: ['./images/steve/left.png'],
      right: ['./images/steve/right.png'],
      up: ['./images/steve/up.png']
    })

    this.entities.push(new Character('Bruno', {
      default: ['./images/bruno/0.png']
    }))

    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
    document.addEventListener('wheel', this.onWheel)
    window.addEventListener('resize', this.windowResize)

    this.draw()
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d', { alpha: false })
    this.windowResize()
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)
    document.removeEventListener('wheel', this.onWheel)
    window.removeEventListener('resize', this.windowResize)

    this.drawCompanion.running = false
  }
}
