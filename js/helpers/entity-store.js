import DialogView from '../helpers/dialog-view.js'
import Entity from '../classes/entity.js'
import { CharacterCompanion, Character } from '../classes/character.js'

export default {
  loaded: false,
  entities: [],
  load(context) {
    if (!this.loaded) {
      this.entities.push(new Character('Steve', {
        idle: ['steve/0.png', 'steve/1.png'],
        left: ['steve/left0.png', 'steve/left1.png'],
        right: ['steve/right0.png', 'steve/right1.png'],
        up: ['steve/up0.png', 'steve/up1.png'],
        down: ['steve/down0.png', 'steve/down1.png']
      }, [3190, 3370]))

      this.entities.push(new Character('Bruno', {
        idle: ['bruno/0.png', 'bruno/1.png'],
        left: ['bruno/down0.png', 'bruno/down1.png'],
        right: ['bruno/down0.png', 'bruno/down1.png'],
        up: ['bruno/up0.png', 'bruno/up1.png'],
        down: ['bruno/down0.png', 'bruno/down1.png']
      }, [3100, 3450]))
      this.entities[1].speed = CharacterCompanion.WALKING_SPEED_SLOW
      this.entities[1].addToWalkPath([2935, 3460], [2935, 3760], [3180, 3745], [3170, 3620], [3060, 3550], [3100, 3450])
      this.entities[1].interaction = () => DialogView.show(this.entities[1].name, 'Hi Steve! Nice to meet you!')

      this.entities.push(new Character('Pollux', {
        idle: ['pollux/0.png', 'pollux/1.png'],
        left: ['pollux/down0.png', 'pollux/down1.png'],
        right: ['pollux/down0.png', 'pollux/down1.png'],
        up: ['pollux/up0.png', 'pollux/up1.png'],
        down: ['pollux/down0.png', 'pollux/down1.png']
      }, [3170, 3300]))
      this.entities[2].speed = CharacterCompanion.WALKING_SPEED_SLOW
      this.entities[2].addToWalkPath([3180, 3400], [3150, 3425], [3180, 3400], [3170, 3300])
      this.entities[2].interaction = () => DialogView.show(this.entities[2].name, 'Grrrwrwwrrrrwr...')

      this.entities.push(new Character('Skello', {
        idle: ['skello/0.png']
      }, [3210, 3610]))
      this.entities.push(new Character('Skello', {
        idle: ['skello/0.png']
      }, [3230, 3630]))
      this.entities.push(new Character('Skello', {
        idle: ['skello/0.png']
      }, [3230, 3610]))
      this.entities.push(new Character('Skello', {
        idle: ['skello/0.png']
      }, [3210, 3650]))

      this.entities.push(new Entity('Bruno\'s bakery', {
        idle: ['locations/bruno.png']
      }, [3095, 3410]))
      this.entities[7].interaction = () => context.$router.push('/d/bakery')
      this.entities.push(new Entity('the weapon shop', {
        idle: ['locations/weapons.png']
      }, [3110, 3500]))
      this.entities[8].interaction = () => context.$router.push('/d/weapons')

      this.entities.push(new Entity('the sword', {
        idle: ['items/sword1.png', 'items/sword2.png']
      }, [3110, 3450]))
      this.entities[9].interaction = () => DialogView.show('Narrator', 'That looks like a pretty cool sword!')

      this.entities.push(new Character('Entity Test', {
        idle: ['narrator.png']
      }, [3090, 3595]))
      this.entities[10].interaction = () => DialogView.show('Entity Test', '*%$#*%$#*%$#!')
      this.entities[10].speed = CharacterCompanion.WALKING_SPEED_SLOW
      this.entities[10].generateRandomPath(8)

      this.loaded = true
    }
    context.entities = this.entities
  }
}
