export default {
  name: 'stats',
  props: {
    character: {}
  },
  template:
  `<div class="stats">
    <h1 class="m-0">{{ character.name }}</h1>
    <div class="relative">
      <span class="absolute">{{ character.data.health }} hearts</span>
      <progress class="red" :value="character.data.health" max="100"></progress>
    </div>
    <div class="grid-2">
      <div class="relative">
        <span class="absolute">{{ character.data.energy }} energy</span>
        <progress :value="character.data.energy" max="100"></progress>
      </div>
      <div class="relative">
        <span class="absolute">{{ character.data.terror }} terror</span>
        <progress class="deep-purple" :value="character.data.terror" max="100"></progress>
      </div>
    </div>
  </div>`
}
