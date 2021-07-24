export default {
  name: 'inventory',
  props: {
    entity: Object
  },
  data() {
    return {
      shown: false
    }
  },
  computed: {
    inventory() {
      return this.entity?.data?.inventory || []
    }
  },
  template:
  `<div v-show="shown" class="screen-center-container inventory-container">
    <div class="screen-center inventory">
      <h1>Inventory</h1>
      <div class="card inventory-grid">
        <div v-for="(item, i) in inventory" :key="i" class="card">
          <img :src="'./images/' + item.texture" :alt="item.name"></img>
          <span class="tooltip">{{ item.name }}</span>
        </div>
        <div v-for="i in (40 - inventory.length)" :key="i + inventory.length" class="card"></div>
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
