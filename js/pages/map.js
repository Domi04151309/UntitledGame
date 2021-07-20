/*eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }]*/

import Menu from '../components/menu.js'
import Inventory from '../components/inventory.js'
import Stats from '../components/stats.js'
import Tutorial from '../components/tutorial.js'
import POverlay from '../components/p-overlay.js'

import SaveState from '../helpers/save-state.js'
import MapStore from '../helpers/map-store.js'
import EntityStore from '../helpers/entity-store.js'
import Counter from '../classes/counter.js'
import Vector from '../classes/vector.js'
import { CharacterCompanion, Character } from '../classes/character.js'

const ENTITY_SIZE = 16
const ESTIMATED_FRAMERATE = 60

export default {
  name: 'map',
  data() {
    return {
      ctx: null,
      entities: [],
      scale: 5,
      interaction: 0,
      tip: '',
      counters: {
        oneFourth: null,
        two: null,
        five: null
      },
      drawCompanion: {
        running: true,
        lastCalled: 0,
        fps: 0,
        frameCounter: 0
      }
    }
  },
  template:
  `<div>
    <Menu v-on:paused="onPaused()"></Menu>
    <Inventory></Inventory>
    <main class="full-height">
      <Stats :entity="entities[0]"></Stats>
      <Stats class="right" :entity="interaction != 0 ? entities[interaction] : null"></Stats>
      <div class="quest">
        <h2>Quest</h2>
        <p>Explore the world!</p>
      </div>
      <Tutorial></Tutorial>
      <POverlay :data="{ i: counters.oneFourth?.count, fps: drawCompanion.fps, entities: entities.length, scale: scale, position: entities[0]?.position, movement: entities[0]?.movement }"></POverlay>
      <p class="tip">{{ tip }}</p>
      <canvas ref="canvas"></canvas>
    </main>
  </div>`,
  components: {
    Menu,
    Inventory,
    Stats,
    Tutorial,
    POverlay
  },
  methods: {
    onPaused() {
      if (this.drawCompanion.running) {
        this.drawCompanion.running = false
      } else {
        this.drawCompanion.running = true
        requestAnimationFrame(this.draw)
      }
    },
    onKeyDown(event) {
      if (this.drawCompanion.running) {
        if (event.keyCode == 87 && this.entities[0].movement[1] != -1) {
          this.entities[0].movement[1] = -1
          this.counters.oneFourth.reset()
        } else if (event.keyCode == 65 && this.entities[0].movement[0] != -1) {
          this.entities[0].movement[0] = -1
          this.counters.oneFourth.reset()
        } else if (event.keyCode == 83 && this.entities[0].movement[1] != 1) {
          this.entities[0].movement[1] = 1
          this.counters.oneFourth.reset()
        } else if (event.keyCode == 68 && this.entities[0].movement[0] != 1) {
          this.entities[0].movement[0] = 1
          this.counters.oneFourth.reset()
        } else if (event.keyCode == 16) this.entities[0].speed = CharacterCompanion.WALKING_SPEED_SLOW
          else if (event.keyCode == 32) this.entities[0].speed = CharacterCompanion.WALKING_SPEED_FAST
          else if (event.keyCode == 189 && this.scale > 2) this.scale -= 1
          else if (event.keyCode == 187 && this.scale < 20) this.scale += 1
          else if (event.keyCode == 81 && this.interaction != 0) this.entities[this.interaction].interaction()
      }
    },
    onKeyUp(event) {
      if (this.drawCompanion.running) {
        if (event.keyCode == 87 || event.keyCode == 83) {
          this.entities[0].movement[1] = 0
          this.counters.two.reset()
        } else if (event.keyCode == 65 || event.keyCode == 68) {
          this.entities[0].movement[0] = 0
          this.counters.two.reset()
        } else if (event.keyCode == 16 || event.keyCode == 32) this.entities[0].speed = CharacterCompanion.WALKING_SPEED_NORMAL
      }
    },
    onWheel(event) {
      if (this.drawCompanion.running) {
        if (event.deltaY > 0 && this.scale > 2) this.scale -= 1
        else if (event.deltaY < 0 && this.scale < 20) this.scale += 1
      }
    },
    windowResize() {
      this.$refs.canvas.width = window.innerWidth
      this.$refs.canvas.height = window.innerHeight
    },
    async setupDrawing() {
      this.ctx = this.$refs.canvas.getContext('2d', { alpha: false })
      this.windowResize()

      this.ctx.fillStyle = '#000'
      this.ctx.strokeStyle  = '#888'
      this.ctx.lineWidth = 4
      this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      this.ctx.beginPath()
      this.ctx.arc(window.innerWidth / 2, window.innerHeight / 2, 48, 0, 2 * Math.PI)
      this.ctx.stroke()

      this.counters.oneFourth = new Counter(ESTIMATED_FRAMERATE / 4)
      this.counters.two = new Counter(ESTIMATED_FRAMERATE * 2)
      this.counters.five = new Counter(ESTIMATED_FRAMERATE * 5)

      await MapStore.load()
      EntityStore.load(this)
      SaveState.load(this)
      for (const entity of this.entities) {
        await entity.loadSprites()
      }

      if (this.drawCompanion.running) requestAnimationFrame(this.draw)
    },
    draw(time = 0) {
      //FPS
      if ((time - this.drawCompanion.lastCalled) / 1000 > 1) {
        this.drawCompanion.lastCalled = time
        this.drawCompanion.fps = this.drawCompanion.frameCounter
        this.drawCompanion.frameCounter = 0
      } else {
        this.drawCompanion.frameCounter++
      }

      //Character specific logic
      this.entities[0].move()
      this.entities.forEach((entity, i) => {
        if (i != 0 && entity instanceof Character) entity.followPath()
      })
      //Character animation
      if (this.counters.oneFourth.increment() == 1) {
        this.entities.forEach(entity => {
          if (entity instanceof Character) entity.chooseMatchingSprite()
        })
      }
      if (this.counters.two.increment() == 1) {
        this.entities.forEach(entity => entity.updateIdleSprite())
      }
      if (this.counters.five.increment() == 1) {
        this.entities.forEach(entity => {
          if (entity instanceof Character && entity.data.energy < 100) entity.data.energy += 1
        })
      }
      this.interaction = 0
      this.tip = ''
      this.entities.forEach((entity, i) => {
        if (i != 0 && new Vector(entity.position[0] - this.entities[0].position[0], entity.position[1] - this.entities[0].position[1]).getAbs() < 24) {
          this.interaction = i
          this.tip = 'Press Q to interact with ' + entity.name
        }
      })

      //Map drawing
      const x = -this.entities[0].position[0] * this.scale + window.innerWidth / 2
      const y = -this.entities[0].position[1] * this.scale + (window.innerHeight + this.scale * ENTITY_SIZE) / 2
      this.ctx.imageSmoothingEnabled = false
      this.ctx.fillStyle = '#1C50F1'
      if (window.settings.graphics == 'medium' || window.settings.graphics == 'high') this.ctx.filter = 'brightness(90%)'
      //this.ctx.filter = 'brightness(25%) sepia(50%)'
      this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      this.ctx.drawImage(
        MapStore.default,
        x,
        y,
        this.scale * MapStore.default.width,
        this.scale * MapStore.default.height
      )
      this.ctx.filter = 'none'
      this.ctx.shadowColor = '#000'
      if (window.settings.graphics == 'high') this.ctx.shadowBlur = 16
      this.ctx.drawImage(
        MapStore.structuresBottom,
        x,
        y,
        this.scale * MapStore.default.width,
        this.scale * MapStore.default.height
      )
      this.entities.reduceRight((_, entity) => {
        this.ctx.drawImage(
          entity.sprites.selected,
          x + (entity.position[0] - ENTITY_SIZE / 2) * this.scale + entity.getOffset(this.scale),
          y + (entity.position[1] - ENTITY_SIZE) * this.scale,
          this.scale * ENTITY_SIZE,
          this.scale * ENTITY_SIZE
        )
      }, null)
      this.ctx.drawImage(
        MapStore.structuresTop,
        x,
        y,
        this.scale * MapStore.default.width,
        this.scale * MapStore.default.height
      )
      this.ctx.shadowBlur = 0

      if (this.drawCompanion.running) requestAnimationFrame(this.draw)
    }
  },
  mounted() {
    this.setupDrawing()
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
    document.addEventListener('wheel', this.onWheel)
    window.addEventListener('resize', this.windowResize)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)
    document.removeEventListener('wheel', this.onWheel)
    window.removeEventListener('resize', this.windowResize)

    SaveState.save(this)
    this.drawCompanion.running = false
  }
}
