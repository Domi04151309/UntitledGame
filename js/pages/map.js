/*eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }]*/

import Menu from '../components/menu.js'
import Inventory from '../components/inventory.js'
import Stats from '../components/stats.js'
import POverlay from '../components/p-overlay.js'

import MapStore from '../helpers/map-store.js'
import Character from '../classes/character.js'

const ENTITY_SIZE = 16
const COUNTER_MAX = 120

export default {
  name: 'map',
  data() {
    return {
      ctx: null,
      mapStore: null,
      character: null,
      entitiesLoaded: false,
      entities: [],
      scale: 5,
      counter: COUNTER_MAX,
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
    <Inventory></Inventory>
    <main class="full-height">
      <Stats :character="character"></Stats>
      <POverlay :data="{ i: counter, fps: this.drawCompanion.fps, scale: this.scale, position: this.character.position, movement: this.character.movement }"></POverlay>
      <p class="card tutorial">
        Use WASD to move
      </p>
      <canvas ref="canvas"></canvas>
    </main>
  </div>`,
  components: {
    Menu,
    Inventory,
    Stats,
    POverlay
  },
  methods: {
    onKeyDown(event) {
      if (event.keyCode == 87 && this.character.movement[1] != 1) {
        this.character.movement[1] = 1
        this.counter = COUNTER_MAX
      } else if (event.keyCode == 65 && this.character.movement[0] != 1) {
        this.character.movement[0] = 1
        this.counter = COUNTER_MAX
      } else if (event.keyCode == 83 && this.character.movement[1] != -1) {
        this.character.movement[1] = -1
        this.counter = COUNTER_MAX
      } else if (event.keyCode == 68 && this.character.movement[0] != -1) {
        this.character.movement[0] = -1
        this.counter = COUNTER_MAX
      }
    },
    onKeyUp(event) {
      if (event.keyCode == 87 || event.keyCode == 83) {
        this.character.movement[1] = 0
        this.counter = COUNTER_MAX
      } else if (event.keyCode == 65 || event.keyCode == 68) {
        this.character.movement[0] = 0
        this.counter = COUNTER_MAX
      }
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

      //Init
      if (!this.mapStore.loaded) await this.mapStore.load()
      if (!this.character.sprites.loaded) await this.character.loadSprites()
      if (!this.entitiesLoaded) {
        for (const entity of this.entities) {
          await entity.loadSprites()
        }
        this.entitiesLoaded = true
      }

      //FPS
      const delta = (time - this.drawCompanion.lastCalled) / 1000
      this.drawCompanion.lastCalled = time
      this.drawCompanion.fps = Math.floor(1 / delta)

      //Character specific logic
      this.character.move(this.mapStore.offsceen.ctx)
      //Character animation
      switch (this.counter) {
        case COUNTER_MAX: //once every two seconds
          this.randomOffset = Math.round(Math.random())
          this.character.updateRandomSprite()
          //break omitted
        case COUNTER_MAX / 8:
        case COUNTER_MAX / 4:
        case 3 * COUNTER_MAX / 8:
        case COUNTER_MAX / 2:
        case 5 * COUNTER_MAX / 8:
        case 3 * COUNTER_MAX / 4:
        case 7 * COUNTER_MAX / 8: //four times a second
          this.character.chooseMatchingSprite()
          break
      }

      //Map drawing
      this.ctx.imageSmoothingEnabled = false
      this.ctx.fillStyle = '#1C50F1'
      this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      this.ctx.drawImage(
        this.mapStore.default,
        this.character.position[0] * this.scale + window.innerWidth / 2,
        this.character.position[1] * this.scale + window.innerHeight / 2,
        this.scale * this.mapStore.default.width,
        this.scale * this.mapStore.default.height
      )
      this.ctx.drawImage(
        this.mapStore.structures,
        this.character.position[0] * this.scale + window.innerWidth / 2,
        this.character.position[1] * this.scale + window.innerHeight / 2,
        this.scale * this.mapStore.default.width,
        this.scale * this.mapStore.default.height
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
        (window.innerWidth - ENTITY_SIZE * this.scale) / 2 + (this.character.movement[0] == 0 &&  this.character.movement[1] == 0 ? this.randomOffset * this.scale : 0),
        window.innerHeight / 2 - ENTITY_SIZE * this.scale,
        this.scale * ENTITY_SIZE,
        this.scale * ENTITY_SIZE
      )

      //Counter for random events
      this.counter++
      if (this.counter > COUNTER_MAX) this.counter = 0

      this.drawCompanion.drawing = false
    }
  },
  created() {
    this.mapStore = MapStore

    this.character = new Character('Steve', {
      idle: ['steve/0.png', 'steve/1.png'],
      left: ['steve/left0.png', 'steve/left1.png'],
      right: ['steve/right0.png', 'steve/right1.png'],
      up: ['steve/up0.png', 'steve/up1.png'],
      down: ['steve/down0.png', 'steve/down1.png']
    })

    this.entities.push(new Character('Bruno', {
      idle: ['bruno/0.png']
    }, [-3100, -3450]))

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
