import Menu from '../components/menu.js'

export default {
  name: 'map',
  template:
  `<div>
    <Menu></Menu>
    <main class="full-height">
      <p class="card tutorial">
        Use WASD to move.
      </p>
    </main>
  </div>`,
  components: {
    Menu
  },
  methods: {
    onKeyDown(event) {
      if (event.keyCode == 87) alert('w')
      else if (event.keyCode == 65) alert('a')
      else if (event.keyCode == 83) alert('s')
      else if (event.keyCode == 68) alert('d')
    }
  },
  created() {
    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
  }
}
