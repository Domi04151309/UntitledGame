import Menu from '../components/menu.js'

import StateHelper from '../helpers/state.js'

export default {
  name: 'dialog',
  data() {
    return {
      opened: true,
      dialog: {},
      dialogIndex: 0,
      text: '',
      textIndex: 0
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
          <p :class="'m-0 accent-text ' + dialog.speech[dialogIndex][1].color">{{ dialog.speech[dialogIndex][1].name }}</p>
          <p class="m-0">{{ text }}</p>
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
    startTypeWriter() {
      if (this.textIndex < this.dialog.speech[this.dialogIndex][0].length) {
        this.text += this.dialog.speech[this.dialogIndex][0].charAt(this.textIndex)
        this.textIndex++
      }
      if (this.opened) setTimeout(this.startTypeWriter, 50)
    },
    resetTypewriter() {
      this.textIndex = 0
      this.text = ''
    },
    prev() {
      if (this.dialogIndex > 0) {
        this.dialogIndex--
        this.resetTypewriter()
      }
    },
    next() {
      if (this.dialog.speech.length > this.dialogIndex + 1) {
        this.dialogIndex++
        this.resetTypewriter()
      } else {
        this.dialog.onFinish()
        this.$router.push('/m')
      }
    }
  },
  created() {
    this.dialog = StateHelper.getDialogFromState(this.$route.params.location)
    document.addEventListener('keydown', this.onKeyDown)
    this.startTypeWriter()
  },
  beforeDestroy() {
    this.opened = false
    document.removeEventListener('keydown', this.onKeyDown)
  }
}
