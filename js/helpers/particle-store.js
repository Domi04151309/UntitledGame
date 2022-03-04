import ImageHelper from './image.js'

export default {
  loaded: false,
  size: 32,
  attack0: null,
  attack1: null,
  attack2: null,
  attack3: null,
  attack4: null,
  attack5: null,
  attack6: null,
  attack7: null,
  attack8: null,
  attack9: null,
  attack10: null,
  attack11: null,
  attack12: null,
  attack13: null,
  attack14: null,
  attack15: null,
  attack: null,
  async load() {
    if (!this.loaded) {
      this.attack0 = await ImageHelper.loadImage('particles/explosion_0.png')
      this.attack1 = await ImageHelper.loadImage('particles/explosion_1.png')
      this.attack2 = await ImageHelper.loadImage('particles/explosion_2.png')
      this.attack3 = await ImageHelper.loadImage('particles/explosion_3.png')
      this.attack4 = await ImageHelper.loadImage('particles/explosion_4.png')
      this.attack5 = await ImageHelper.loadImage('particles/explosion_5.png')
      this.attack6 = await ImageHelper.loadImage('particles/explosion_6.png')
      this.attack7 = await ImageHelper.loadImage('particles/explosion_7.png')
      this.attack8 = await ImageHelper.loadImage('particles/explosion_8.png')
      this.attack9 = await ImageHelper.loadImage('particles/explosion_9.png')
      this.attack10 = await ImageHelper.loadImage('particles/explosion_10.png')
      this.attack11 = await ImageHelper.loadImage('particles/explosion_11.png')
      this.attack12 = await ImageHelper.loadImage('particles/explosion_12.png')
      this.attack13 = await ImageHelper.loadImage('particles/explosion_13.png')
      this.attack14 = await ImageHelper.loadImage('particles/explosion_14.png')
      this.attack15 = await ImageHelper.loadImage('particles/explosion_15.png')
      this.attack = [
        this.attack0, this.attack1, this.attack2, this.attack3, this.attack4,
        this.attack5, this.attack6, this.attack7, this.attack8, this.attack9,
        this.attack10, this.attack11, this.attack12, this.attack13, this.attack14,
        this.attack15
      ]
      this.loaded = true
    }
  }
}
