import Dialogs from '../data/dialogs.js'
import Locations from '../data/locations.js'

export default {
  set state(x) { localStorage.setItem('state', x) },
  get state() { return parseInt(localStorage.getItem('state') || 0) },
  getQuest() {
    switch (this.state) {
      case 1: return 'Talk to Bruno!'
      case 2: return 'Pick up the sword!'
      case 3: return 'Talk to Bruno!'
      default: return 'Explore the world!'
    }
  },
  getDialogFromState(location) {
    let key = null
    switch (location) {
      case 'bruno':
        if (this.state == 1) key = 'introOutside'
        else if (this.state == 3) key = 'introOutside2'
        else key = 'bruno'
        break
      case 'bakery':
        if (this.state == 0) key = 'intro'
        else key = 'bakery'
        break
      case 'weapons':
        key = 'weapons'
        break
      case 'magic':
        key = 'magic'
        break
      default:
        key = 'default'
        break
    }
    const dialog = Dialogs[key]
    dialog.background = Locations[location]
    return dialog
  }
}
