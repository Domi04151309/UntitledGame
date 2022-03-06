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
        <img class="card inventory-selected" :src="selected != null ? './images/' + inventory[selected]?.texture : ''" :alt="selected != null ? inventory[selected]?.name : ''"></img>
        <div class="inventory-selected">
          <h2 class="mt-0">{{ selected != null ? inventory[selected]?.name : '' }}</h2>
          <div>
            <button type="button" v-on:click="equipItem()">{{ inventory[selected]?.id == entity?.data?.equipped?.id ? 'Unequip' : 'Equip' }}</button>
            <button type="button" v-on:click="scrapItem()">Scrap</button>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  methods: {
    equipItem() {
      if (this.inventory[this.selected]?.id == this.entity?.data?.equipped?.id) {
        this.entity.data.equipped = null
      } else {
        this.entity.data.equipped = this.inventory[this.selected]
      }
    },
    scrapItem() {
      if (this.inventory[this.selected]?.id == this.entity?.data?.equipped?.id) {
        this.entity.data.equipped = null
      }
      const selected = this.selected
      this.selected = null
      this.inventory.splice(selected, 1)
    },
    onKeyDown(event) {
      if (event.keyCode == 69) {
        if (this.selected == null) {
          this.shown = !this.shown
          this.$emit('busy')
        } else {
          this.selected = null
        }
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
