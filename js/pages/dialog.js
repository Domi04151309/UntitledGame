import Menu from '../components/menu.js'

import StateHelper from '../helpers/state.js'

export default {
  name: 'dialog',
  data() {
    return {
      dialog: {},
      index: 0
    }
  },
  template:
  `<div>
    <Menu></Menu>
    <main class="full-height" :style="'background: var(--background-dim), url(' + dialog.background + ') no-repeat center/cover;'" v-on:click="next()">
      <p v-if="!localStorage.getItem('tutorial_complete')" class="card tutorial">
        Click or press enter to continue. Press backspace to go back.
      </p>
      <img class="dialog-character left" :src="dialog.character[0].texture">
      <img class="dialog-character right" :src="dialog.character[1].texture">
      <div class="dialog-box-container">
        <div class="card dialog-box">
          <p :class="'m-0 accent-text ' + dialog.speech[index][1].color">{{ dialog.speech[index][1].name }}</p>
          <p class="m-0">{{ dialog.speech[index][0] }}</p>
        </div>
      </div>
    </main>
  </div>`,
  components: {
    Menu
  },
  methods: {
    onKeyDown(event) {
      if (event.keyCode == 13) this.next()
      else if (event.keyCode == 8) this.prev()
    },
    prev() {
      if (this.index > 0) this.index--
    },
    next() {
      if (this.dialog.speech.length > this.index + 1) this.index++
      else {
        StateHelper.state++
        this.$router.push('/m')
      }
    }
  },
  created() {
    this.dialog = StateHelper.getDialogFromState()
    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
  }
}
