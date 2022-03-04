import MapStore from './map-store.js'

export default {
  randomOffset(radius) {
    const number = Math.floor(Math.random() * radius)
    if (Math.random() < .5) return number
    else return -number
  },
  randomPositionNearby(point, radius) {
    const newPoint = [point[0] + this.randomOffset(radius), point[1] + this.randomOffset(radius)]
    if (MapStore.offsceen.ctx.getImageData(newPoint[0], newPoint[1], 1, 1).data[0] > 0)
      return this.randomPositionNearby(point, radius)
    else
      return newPoint
  }
}
