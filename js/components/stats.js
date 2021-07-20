import { Character } from '../classes/character.js'

export default {
  name: 'stats',
  props: {
    entity: Object
  },
  computed: {
    show(){
      return this.entity instanceof Character
    }
  },
  template:
  `<div v-if="show" class="stats">
    <h1 class="m-0">{{ entity?.name }}</h1>
    <div class="relative">
      <span class="absolute">{{ entity?.data?.health }} hearts</span>
      <progress class="red" :value="entity?.data?.health" max="100"></progress>
    </div>
    <div class="grid-2">
      <div class="relative">
        <span class="absolute">{{ entity?.data?.energy }} energy</span>
        <progress :value="entity?.data?.energy" max="100"></progress>
      </div>
      <div class="relative">
        <span class="absolute">{{ entity?.data?.terror }} terror</span>
        <progress class="deep-purple" :value="entity?.data?.terror" max="100"></progress>
      </div>
    </div>
  </div>`
}
