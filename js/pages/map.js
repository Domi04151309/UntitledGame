/*eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }]*/

import Menu from '../components/menu.js'
import Inventory from '../components/inventory.js'
import Stats from '../components/stats.js'
import Tutorial from '../components/tutorial.js'
import POverlay from '../components/p-overlay.js'

import MapStore from '../helpers/map-store.js'
import Counter from '../classes/counter.js'
import Entity from '../classes/entity.js'
import { CharacterCompanion, Character } from '../classes/character.js'

const ENTITY_SIZE = 16
const ESTIMATED_FRAMERATE = 60

export default {
  name: 'map',
  data() {
    return {
      ctx: null,
      mapStore: null,
      entitiesLoaded: false,
      entities: [],
      scale: 5,
      counters: {
        oneFourth: null,
        two: null,
        five: null
      },
      drawCompanion: {
        running: true,
        drawing: false,
        lastCalled: 0,
        fps: 0,
        frameCounter: 0
      }
    }
  },
  template:
  `<div>
    <Menu></Menu>
    <Inventory></Inventory>
    <main class="full-height">
      <Stats :character="this.entities[0]"></Stats>
      <Tutorial></Tutorial>
      <POverlay :data="{ i: counters.oneFourth.count, fps: this.drawCompanion.fps, scale: this.scale, position: this.entities[0].position, movement: this.entities[0].movement }"></POverlay>
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
    onKeyDown(event) {
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

      event.preventDefault()
      event.stopPropagation()
    },
    onKeyUp(event) {
      if (event.keyCode == 87 || event.keyCode == 83) {
        this.entities[0].movement[1] = 0
        this.counters.two.reset()
      } else if (event.keyCode == 65 || event.keyCode == 68) {
        this.entities[0].movement[0] = 0
        this.counters.two.reset()
      } else if (event.keyCode == 16 || event.keyCode == 32) this.entities[0].speed = CharacterCompanion.WALKING_SPEED_NORMAL
    },
    onWheel(event) {
      if (event.deltaY > 0 && this.scale > 2) this.scale -= 1
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
      if (!this.entitiesLoaded) {
        for (const entity of this.entities) {
          await entity.loadSprites()
        }
        this.entitiesLoaded = true
      }

      //FPS
      if ((time - this.drawCompanion.lastCalled) / 1000 > 1) {
        this.drawCompanion.lastCalled = time
        this.drawCompanion.fps = this.drawCompanion.frameCounter
        this.drawCompanion.frameCounter = 0
      } else {
        this.drawCompanion.frameCounter++
      }

      //Character specific logic
      this.entities[0].move(this.mapStore.offsceen.ctx)
      this.entities[1].followPath(this.mapStore.offsceen.ctx)
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
          if (entity instanceof Character && entity.energy < 100) entity.energy += 1
        })
      }

      //Map drawing
      const x = -this.entities[0].position[0] * this.scale + window.innerWidth / 2
      const y = -this.entities[0].position[1] * this.scale + (window.innerHeight + this.scale * ENTITY_SIZE) / 2
      this.ctx.imageSmoothingEnabled = false
      this.ctx.fillStyle = '#1C50F1'
      this.ctx.filter = 'brightness(90%)';
      this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      this.ctx.drawImage(
        this.mapStore.default,
        x,
        y,
        this.scale * this.mapStore.default.width,
        this.scale * this.mapStore.default.height
      )
      this.ctx.filter = 'none'
      this.ctx.shadowColor = '#000'
      this.ctx.shadowBlur = 16
      this.ctx.drawImage(
        this.mapStore.structuresBottom,
        x,
        y,
        this.scale * this.mapStore.default.width,
        this.scale * this.mapStore.default.height
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
        this.mapStore.structuresTop,
        x,
        y,
        this.scale * this.mapStore.default.width,
        this.scale * this.mapStore.default.height
      )
      this.ctx.shadowBlur = 0

      this.drawCompanion.drawing = false
    }
  },
  created() {
    this.mapStore = MapStore

    this.entities.push(new Character('Steve', {
      idle: ['steve/0.png', 'steve/1.png'],
      left: ['steve/left0.png', 'steve/left1.png'],
      right: ['steve/right0.png', 'steve/right1.png'],
      up: ['steve/up0.png', 'steve/up1.png'],
      down: ['steve/down0.png', 'steve/down1.png']
    }, [3190, 3370]))

    this.entities.push(new Character('Bruno', {
      idle: ['bruno/0.png', 'bruno/1.png'],
      left: ['bruno/down0.png', 'bruno/down1.png'],
      right: ['bruno/down0.png', 'bruno/down1.png'],
      up: ['bruno/up0.png', 'bruno/up1.png'],
      down: ['bruno/down0.png', 'bruno/down1.png']
    }, [3100, 3450]))
    this.entities[1].speed = CharacterCompanion.WALKING_SPEED_SLOW
    this.entities[1].addToWalkPath([2935, 3460], [2935, 3760], [3180, 3745], [3170, 3620], [3060, 3550], [3100, 3450])

    this.entities.push(new Character('Pollux', {
      idle: ['pollux/0.png', 'pollux/1.png']
    }, [3170, 3300]))

    this.entities.push(new Entity({
      idle: ['items/sword1.png', 'items/sword2.png']
    }, [3110, 3450]))

    this.counters.oneFourth = new Counter(ESTIMATED_FRAMERATE / 4)
    this.counters.two = new Counter(ESTIMATED_FRAMERATE * 2)
    this.counters.five = new Counter(ESTIMATED_FRAMERATE * 5)

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
