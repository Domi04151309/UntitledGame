export default {
  name: 'inventory',
  props: {
    entity: Object
  },
  data() {
    return {
      shown: false,
      selected: null
    }
  },
  computed: {
    inventory() {
      return this.entity?.data?.inventory || []
    }
  },
  template:
  `<div v-show="shown">
    <div class="screen-center-container inventory-container">
      <div class="screen-center inventory">
        <h1>Inventory</h1>
        <div class="card inventory-grid">
          <div v-for="(item, i) in inventory" :key="i" class="card" v-on:click="selected = i">
            <img :src="'./images/' + item.texture" :alt="item.name"></img>
            <span class="tooltip">{{ item.name }}</span>
          </div>
          <div v-for="i in (40 - inventory.length)" :key="i + inventory.length" class="card"></div>
        </div>
      </div>
    </div>
    <div v-show="selected != null" class="screen-center-container inventory-container" v-on:click="if ($event.path.length == 8) selected = null">
      <div class="screen-center inventory card p-16 flex space">
        <img class="card inventory-selected" :src="selected ? './images/' + inventory[selected]?.texture : ''" :alt="selected ? inventory[selected]?.name : ''"></img>
        <div class="inventory-selected">
          <h2 class="mt-0">{{ selected ? inventory[selected]?.name : '' }}</h2>
          <p class="mb-0">Press Q to scrap</p>
        </div>
      </div>
    </div>
  </div>`,
  methods: {
    onKeyDown(event) {
      if (event.keyCode == 69) {
        if (this.selected == null) {
          this.shown = !this.shown
          this.$emit('busy')
        } else {
          this.selected = null
        }
      } else if (event.keyCode == 81 && this.selected != null) {
        const selected = this.selected
        this.selected = null
        this.inventory.splice(selected, 1)
      }
    }
  },
  created() {
    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
  }
}
