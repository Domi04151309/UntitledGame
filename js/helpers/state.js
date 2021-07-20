import Dialogs from '../data/dialogs.js'
import Locations from '../data/locations.js'

export default {
  set state(x) { localStorage.setItem('state', x) },
  get state() { return parseInt(localStorage.getItem('state') || 0) },
  getDialogFromState(location) {
    let key = null
    switch (location) {
      case 'bakery':
        if (this.state == 0) key = 'intro'
        else if (this.state == 1) key = 'bakery'
        else key = 'default'
        break
      case 'weapons':
        key = 'weapons'
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
