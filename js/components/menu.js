export default {
  name: 'menu',
  data() {
    return {
      paused: false
    }
  },
  template:
  `<div v-show="paused" class="screen-center-container pause-menu-container">
    <div class="screen-center pause-menu">
      <h1>Untitled Game</h1>
      <p>A simple roleplay game with a twist!</p>
      <button type="button" class="w-100" v-on:click="resumeGame()">Resume Game</button>
      <button type="button" class="w-100" v-on:click="toggleFullScreen()">Toggle Fullscreen</button>
      <button type="button" class="w-100" v-on:click="save()">Save And Return To Main Menu</button>
    </div>
  </div>`,
  methods: {
    resumeGame() {
      this.paused = false
    },
    toggleFullScreen() {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen()
      else if (document.exitFullscreen) document.exitFullscreen()
    },
    save() {
      this.$router.push('/')
    },
    onKeyDown(event) {
      if (event.keyCode == 27) this.paused = !this.paused
    }
  },
  created() {
    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
  }
}
