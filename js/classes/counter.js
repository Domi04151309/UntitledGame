export default class Counter {
  constructor(max) {
    this.max = max
    this.count = 0
  }
  increment() {
    if (this.count < this.max) this.count++
    else this.count = 1
    return this.count
  }
  reset() {
    this.count = 0
  }
}
