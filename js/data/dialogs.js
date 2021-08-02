import StateHelper from '../helpers/state.js'
import SaveState from '../helpers/save-state.js'

const people = {
  narrator: {
    name: 'Narrator',
    texture: './images/narrator.png',
    color: 'blue'
  },
  steve: {
    name: 'Steve',
    texture: './images/steve/0.png',
    color: 'red'
  },
  bruno: {
    name: 'Bruno',
    texture: './images/bruno/0.png',
    color: 'blue'
  },
  elijah: {
    name: 'Elijah',
    texture: './images/elijah/0.png',
    color: 'deep-purple'
  },
  helena: {
    name: 'Helena',
    texture: './images/helena/0.png',
    color: 'deep-purple'
  },
  skello: {
    name: 'Skello',
    texture: './images/skello/0.png',
    color: 'deep-purple'
  }
}

export default {
  default: {
    character: [people.steve, people.narrator],
    speech: [
      ['Hello Steve. How did you get here?', people.narrator],
      ['Who are you?', people.steve],
      ['It\'s time to leave, Steve.', people.narrator],
      ['Wait!', people.steve]
    ],
    onFinish: () => {}
  },
  intro: {
    character: [people.steve, people.bruno],
    speech: [
      ['Hey Steve! Nice to meet you!', people.bruno],
      ['Hi Bruno.', people.steve],
      ['I know you\'re not one of the chatty guys, but have you heard what the governor did recently?', people.bruno],
      ['What is it?', people.steve],
      ['He introduced a new tax that makes food much more expensive! Unbelievable.', people.bruno],
      ['That\'s bad.', people.steve],
      ['Someone has to talk to the governor. Would you do me a favor?', people.bruno],
      ['What favor?', people.steve],
      ['Go meet the governor and tell him what we, the people, think!', people.bruno],
      ['Why would I do that?', people.steve],
      ['You can get one of my famous super cupcakes for free every day?', people.bruno],
      ['Sounds like a deal to me.', people.steve],
      ['Great, thanks a lot! Meet me outside later!', people.bruno],
      ['Alright, see you later!', people.steve],
      ['Bye!', people.bruno]
    ],
    onFinish: () => StateHelper.state++
  },
  introOutside: {
    character: [people.steve, people.bruno],
    speech: [
      ['Hey Steve! You have to learn about weapons first before continuing your adventure!', people.bruno],
      ['Hi Bruno. Tell me more about weapons.', people.steve],
      ['You have to be able to defeat yourself against the bad guys! Pick up the sword in the city center in case you haven\'t already done so!', people.bruno],
      ['Great! That sounds like a plan!', people.steve],
      ['Alright, see you later!', people.steve],
      ['Bye!', people.bruno]
    ],
    onFinish: () => StateHelper.state++
  },
  introOutside2: {
    character: [people.steve, people.bruno],
    speech: [
      ['Hi Bruno. I have picked up the sword outside.', people.steve],
      ['Hey Steve! That\'s great! Now you\'re really ready to go on your mission!', people.bruno],
      ['I will show the governor what his people think about his tyranny!', people.steve],
      ['Wait! Here take a health potion before you go!', people.bruno],
      ['Thanks, see you later!', people.steve],
      ['Bye!', people.bruno]
    ],
    onFinish: () => {
      SaveState.addToInventory({
        name: 'Health Potion',
        texture: 'items/potion_health.png'
      })
      StateHelper.state++
    }
  },
  bruno: {
    character: [people.steve, people.bruno],
    speech: [
      ['Hey Steve! Nice to meet you!', people.bruno],
      ['Hi Bruno.', people.steve]
    ],
    onFinish: () => {}
  },
  bakery: {
    character: [people.steve, people.bruno],
    speech: [
      ['Hey Steve! Nice to meet you!', people.bruno],
      ['Hi Bruno! What\'s the news?', people.steve],
      ['There\'s nothing new.', people.bruno],
      ['Alright, see you later!', people.steve],
      ['Bye!', people.bruno]
    ],
    onFinish: () => {}
  },
  weapons: {
    character: [people.steve, people.elijah],
    speech: [
      ['Hey Steve! Nice to meet you!', people.elijah],
      ['Hi Elijah! Do you have any new weapons?', people.steve],
      ['Sadly, I don\'t.', people.elijah],
      ['Alright, see you later!', people.steve],
      ['Bye!', people.elijah]
    ],
    onFinish: () => {}
  },
  magic: {
    character: [people.steve, people.helena],
    speech: [
      ['Hey Steve! Nice to meet you!', people.helena],
      ['Hi Helena! Do you have any new potions?', people.steve],
      ['Sadly, I don\'t.', people.helena],
      ['Alright, see you later!', people.steve],
      ['Bye!', people.helena]
    ],
    onFinish: () => {}
  },
  skello: {
    character: [people.steve, people.skello],
    speech: [
      ['Hello Bello, I\'m the Skello!', people.skello],
      ['BOO!', people.skello],
      ['AHHHH!', people.steve]
    ],
    onFinish: () => {
      const context = SaveState.newContext()
      SaveState.load(context)
      context.entities[0].data.health -= 5
      SaveState.save(context)
    }
  }
}
