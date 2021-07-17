export default {
  get(key, fallback = () => null) {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback()
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
