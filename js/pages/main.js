export default {
  name: 'main',
  template:
  `<div class="screen-center-container main-menu-container">
    <main class="screen-center main-menu">
      <h1>Untitled Game</h1>
      <p>A simple roleplay game with a twist!</p>
      <button type="button" class="w-100" v-on:click="resumeGame()">Play</button>
      <button type="button" class="w-100" v-on:click="toggleFullScreen()">Toggle Fullscreen</button>
    </main>
  </div>`,
  methods: {
    resumeGame() {
      this.$router.push('/d/0x01')
    },
    toggleFullScreen() {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen()
      else if (document.exitFullscreen) document.exitFullscreen()
    }
  }
}
