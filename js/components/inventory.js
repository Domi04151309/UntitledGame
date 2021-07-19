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
      <div class="card inventory-grid">
        <div v-for="index in 40" :key="index" class="card"></div>
      </div>
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
