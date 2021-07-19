export default {
  name: 'tutorial',
  data() {
    return {
      shown: true,
      index: 0,
      text: [
        'Use WASD to move',
        'Press E to open your inventory',
        'Press M to pause the game'
      ]
    }
  },
  template:
  `<p v-if="shown" class="card tutorial">
    {{ text[index] }}
  </p>`,
  methods: {
    onKeyDown(event) {
      if (
        (this.index == 0 && (event.keyCode == 87 || event.keyCode == 65 || event.keyCode == 83 || event.keyCode == 68))
        || (this.index == 1 && event.keyCode == 69)
      ) {
        this.index++
      } else if (this.index == 2 && event.keyCode == 77) {
        this.index++
        this.shown = false
        document.removeEventListener('keydown', this.onKeyDown)
        localStorage.setItem('tutorial_complete', '1')
      }
    }
  },
  created() {
    if (!localStorage.getItem('tutorial_complete')) document.addEventListener('keydown', this.onKeyDown)
    else this.shown = false
  },
  beforeDestroy() {
    if (this.shown) document.removeEventListener('keydown', this.onKeyDown)
  }
}
