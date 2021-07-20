export default {
  name: 'menu',
  data() {
    return {
      paused: false,
      graphics: window.settings.graphics
    }
  },
  template:
  `<div v-show="paused" class="screen-center-container pause-menu-container">
    <div class="screen-center pause-menu">
      <h1>Untitled Game</h1>
      <p>A simple roleplay game with a twist!</p>
      <button type="button" class="w-100" v-on:click="resumeGame()">Resume Game</button>
      <div class="grid-2 gap-8">
        <button type="button" class="w-100" v-on:click="toggleGraphics()">Graphics: {{ graphics }}</button>
        <button type="button" class="w-100" v-on:click="toggleFullScreen()">Toggle Fullscreen</button>
      </div>
      <button type="button" class="w-100" v-on:click="save()">Save And Return To Main Menu</button>
    </div>
  </div>`,
  methods: {
    resumeGame() {
      this.paused = false
    },
    toggleGraphics() {
      if (this.graphics == 'high') window.settings.graphics = 'low'
      else if (this.graphics == 'low') window.settings.graphics = 'medium'
      else if (this.graphics == 'medium') window.settings.graphics = 'high'
      this.graphics = window.settings.graphics
    },
    toggleFullScreen() {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen()
      else if (document.exitFullscreen) document.exitFullscreen()
    },
    save() {
      this.$router.push('/')
    },
    onKeyDown(event) {
      if (event.keyCode == 77) this.paused = !this.paused
    }
  },
  created() {
    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
  }
}
