const people = {
  steve: {
    name: 'Steve',
    texture: './images/steve/0.png',
    color: 'red'
  },
  bruno: {
    name: 'Bruno',
    texture: './images/bruno/0.png',
    color: 'blue'
  }
}

export default {
  intro: {
    background: './images/bakery.jpg',
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
    ]
  }
}
