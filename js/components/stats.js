export default {
  name: 'stats',
  data() {
    return {
      paused: false
    }
  },
  template:
  `<div class="stats">
    <h1 class="m-0">Steve</h1>
    <div class="relative">
      <span class="absolute">55 hearts</span>
      <progress class="red" value="55" max="100"></progress>
    </div>
    <div class="grid-2">
      <div class="relative">
        <span class="absolute">55 energy</span>
        <progress value="55" max="100"></progress>
      </div>
      <div class="relative">
        <span class="absolute">55 fear</span>
        <progress class="deep-purple" value="55" max="100"></progress>
      </div>
    </div>
  </div>`
}
