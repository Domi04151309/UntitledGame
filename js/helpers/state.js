import Dialogs from '../data/dialogs.js'

export default {
  set state(x) { localStorage.setItem('state', x) },
  get state() { return parseInt(localStorage.getItem('state') || 0) },
  getDialogFromState(state = this.state) {
    const numberState = parseInt(state, 16)
    let key = null
    switch (numberState) {
      case 0:
        key = 'intro'
        break
    }
    return Dialogs[key]
  }
}
