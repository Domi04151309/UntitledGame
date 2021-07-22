export default {
  loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = './images/' + url
    })
  },
  loadImages(obj) {
    return new Promise((resolve, reject) => {
      let counter = 0
      let last = 0
      const response = {}
      for (const category in obj) {
        response[category] = []
        last += obj[category].length
      }
      for (const category in obj) {
        for (const sprite of obj[category]) {
          const img = new Image()
          img.onload = () => {
            counter++
            if (counter == last) resolve(response)
          }
          img.onerror = reject
          img.src = './images/' + sprite
          response[category].push(img)
        }
      }
    })
  }
}
