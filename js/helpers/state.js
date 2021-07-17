import Dialogs from '../data/dialogs.js'

export default {
  getDialogFromState(state) {
    const numberState = parseInt(state, 16)
    let key = null
    switch (numberState) {
      case 0x01:
        key = 'intro'
        break
    }
    return Dialogs[key]
  }
}
