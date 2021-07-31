import JsonHelper from '../helpers/json.js'

export default {
  save(context) {
    JsonHelper.set('characterData', {
      position: Array.from(context.entities[0].position),
      data: context.entities[0].data
    })
  },
  load(context) {
    const state = JsonHelper.get('characterData')
    if (state != null) {
      context.entities[0].position = new Float32Array(state.position)
      context.entities[0].data = state.data
    }
  },
  addToInventory(item) {
    const context = {
      entities: [{ position: [], data: {} }]
    }
    this.load(context)
    if (context.entities[0].data.inventory.length < 40) context.entities[0].data.inventory.push(item)
    this.save(context)
  }
}
