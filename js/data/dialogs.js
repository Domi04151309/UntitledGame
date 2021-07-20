import StateHelper from '../helpers/state.js'

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
      ['Great, thanks a lot! Meet me outside the city wall later!', people.bruno],
      ['Alright, see you later!', people.steve],
      ['Bye!', people.bruno]
    ],
    onFinish: () => StateHelper.state++
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
      ['Hi Skello! Do you have any new weapons?', people.steve],
      ['Sadly, I don\'t.', people.elijah],
      ['Alright, see you later!', people.steve],
      ['Bye!', people.elijah]
    ],
    onFinish: () => {}
  }
}
