export default class Vector {
  constructor(...entries) {
    this.entries = entries
  }
  getAbs() {
    return Math.sqrt(this.entries.reduce((acc, cur) => acc + Math.pow(cur, 2), 0)) || 0
  }
  normalize() {
    const abs = this.getAbs()
    if (abs == 0) return this
    this.entries = this.entries.map(item => item / abs)
    return this
  }
  multiply(number) {
    this.entries = this.entries.map(item => item * number)
    return this
  }
  toArray() {
    return this.entries
  }
}
