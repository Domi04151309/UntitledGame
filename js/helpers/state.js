import Dialogs from '../data/dialogs.js'

export default {
  set state(x) { localStorage.setItem('state', x) },
  get state() { return parseInt(localStorage.getItem('state') || 0) },
  getDialogFromState() {
    let key = null
    switch (this.state) {
      case 0:
        key = 'intro'
        break
      case 1:
        key = 'bakery'
        break
      default:
        key = 'default'
        break
    }
    return Dialogs[key]
  }
}
