/*global Vue*/

import StateHelper from '../helpers/state.js'
import Modal from '../components/modal.js'

export default {
  name: 'main',
  template:
  `<div class="screen-center-container main-menu-container">
    <main class="screen-center main-menu">
      <h1>Untitled Game</h1>
      <p>A simple roleplay game with a twist!</p>
      <p v-show="window.isMobile">This game does only work on computers!</p>
      <button v-show="!window.isMobile" type="button" class="w-100" v-on:click="resumeGame()">Play</button>
      <button type="button" class="w-100" v-on:click="resetGame()">Reset Game</button>
      <button type="button" class="w-100" v-on:click="toggleFullScreen()">Toggle Fullscreen</button>
    </main>
  </div>`,
  methods: {
    resumeGame() {
      if (StateHelper.state == 0) this.$router.push('/d/bakery')
      else this.$router.push('/m')
    },
    resetGame() {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Reset Game',
          message: 'Are you sure you want to reset the game? This will delete all progress and cannot be undone.',
          positiveText: 'Reset',
          positiveFunction: () => {
            localStorage.clear()
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    toggleFullScreen() {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen()
      else if (document.exitFullscreen) document.exitFullscreen()
    }
  }
}
