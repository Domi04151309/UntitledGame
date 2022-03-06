export default class Item {
  constructor(title, src) {
    this.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    this.name = title
    this.texture = src
  }
}
