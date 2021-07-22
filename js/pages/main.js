import StateHelper from '../helpers/state.js'

export default {
  name: 'main',
  template:
  `<div class="screen-center-container main-menu-container">
    <main class="screen-center main-menu">
      <h1>Untitled Game</h1>
      <p>A simple roleplay game with a twist!</p>
      <p v-show="window.isMobile">This game does only work on computers!</p>
      <button v-show="!window.isMobile" type="button" class="w-100" v-on:click="resumeGame()">Play</button>
      <button type="button" class="w-100" v-on:click="toggleFullScreen()">Toggle Fullscreen</button>
    </main>
  </div>`,
  methods: {
    resumeGame() {
      if (StateHelper.state == 0) this.$router.push('/d/bakery')
      else this.$router.push('/m')
    },
    toggleFullScreen() {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen()
      else if (document.exitFullscreen) document.exitFullscreen()
    }
  }
}
