export default {
  name: 'p-overlay',
  props: {
    data: {}
  },
  data() {
    return {
      shown: false,
    }
  },
  template:
  `<ul v-if="shown" class="p-overlay link-list">
    <li v-for="(value, name, i) in data" :key="i" v-if="i">{{ name }}: {{ value }}</li>
  </ul>`,
  methods: {
    onKeyDown(event) {
      if (event.keyCode == 80) this.shown = !this.shown
    }
  },
  created() {
    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
  }
}
