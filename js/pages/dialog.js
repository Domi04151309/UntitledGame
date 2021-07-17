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
      <p class="card tutorial">
        Click or press enter to continue. Press backspace to go back.
      </p>
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
      else this.$router.push('/m/0x00')
    }
  },
  created() {
    this.dialog = StateHelper.getDialogFromState(parseInt(this.$route.params.state, 16))
    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
  }
}
