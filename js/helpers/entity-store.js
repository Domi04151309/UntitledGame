import DialogView from './dialog-view.js'
import CoordinateHelper from './coordinates.js'
import StateHelper from './state.js'
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
      }, [3090, 3425]))
      this.entities[1].speed = CharacterCompanion.WALKING_SPEED_SLOW
      this.entities[1].addToWalkPath([3045, 3500], [2975, 3465], [3050, 3465], [3090, 3425])
      this.entities[1].interaction = () => context.$router.push('/d/bruno')

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
      this.entities[5].proximityAction = () => {
        this.entities[5].position = new Float32Array([3230, 3610])
        context.$router.push('/d/skello')
      }

      this.entities.push(new Character('Knight', {
        idle: ['knight/0.png'],
        left: ['knight/down0.png', 'knight/down1.png'],
        right: ['knight/down0.png', 'knight/down1.png'],
        up: ['knight/up0.png', 'knight/up1.png'],
        down: ['knight/down0.png', 'knight/down1.png']
      }, [3100, 3450]))
      this.entities[7].speed = CharacterCompanion.WALKING_SPEED_SLOW
      this.entities[7].addToWalkPath([2935, 3460], [2935, 3760], [3180, 3745], [3170, 3620], [3060, 3550], [3100, 3450])

      this.entities.push(new Entity('Bruno\'s bakery', {
        idle: ['locations/bruno.png']
      }, [3095, 3410]))
      this.entities[8].interaction = () => context.$router.push('/d/bakery')
      this.entities.push(new Entity('the weapon shop', {
        idle: ['locations/weapons.png']
      }, [3110, 3500]))
      this.entities[9].interaction = () => context.$router.push('/d/weapons')
      this.entities.push(new Entity('the magic shop', {
        idle: ['locations/magic.png']
      }, [2930, 3520]))
      this.entities[10].interaction = () => context.$router.push('/d/magic')
      this.entities.push(new Entity('your home', {
        idle: ['locations/home.png']
      }, [3010, 3435]))
      this.entities[11].interaction = () => DialogView.show('Narrator', 'Home Sweet Home')

      this.entities.push(new Entity('the sword', {
        idle: ['items/sword1.png', 'items/sword2.png']
      }, [3110, 3450]))
      this.entities[12].interaction = () => {
        if (context.entities[0].data.inventory.length < 40) {
          context.entities[0].data.inventory.push({
            name: 'Sword',
            texture: 'items/sword0.png'
          })
          DialogView.show('Narrator', 'That looks like a pretty cool sword! You picked it up!')
          if (StateHelper.state == 2) StateHelper.state++
        } else {
          DialogView.show('Narrator', 'That looks like a pretty cool sword! Sadly, your inventory is full!')
        }
      }

      for (let i = this.entities.length; i < 30; i++) {
        this.entities.push(new Character('Villager', {
          idle: ['villager/0.png'],
          left: ['villager/down0.png', 'villager/down1.png'],
          right: ['villager/down0.png', 'villager/down1.png'],
          up: ['villager/up0.png', 'villager/up1.png'],
          down: ['villager/down0.png', 'villager/down1.png']
        }, CoordinateHelper.randomPositionNearby([3090, 3595], 200)))
        this.entities[i].speed = CharacterCompanion.WALKING_SPEED_SLOW
        this.entities[i].generateRandomPath(8)
      }

      this.loaded = true
    }
    context.entities = this.entities
  }
}
