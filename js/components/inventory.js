export default {
  name: 'inventory',
  data() {
    return {
      shown: false
    }
  },
  template:
  `<div v-show="shown" class="screen-center-container inventory-container">
    <div class="screen-center inventory">
      <h1>Inventory</h1>
      <p>Not yet available!</p>
    </div>
  </div>`,
  methods: {
    onKeyDown(event) {
      if (event.keyCode == 69) this.shown = !this.shown
    }
  },
  created() {
    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
  }
}
