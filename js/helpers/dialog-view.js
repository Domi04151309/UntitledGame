export default {
  show(person, message) {
    const node = document.createElement('div')
    node.classList.add('dialog-box-container')
    const card = document.createElement('div')
    card.classList.add('card', 'dialog-box')
    const title = document.createElement('p')
    title.classList.add('m-0', 'accent-text')
    title.appendChild(document.createTextNode(person))
    const text = document.createElement('p')
    text.classList.add('m-0')
    text.appendChild(document.createTextNode(message))

    card.appendChild(title)
    card.appendChild(text)
    node.appendChild(card)
    document.body.appendChild(node)

    setTimeout(() => {
      node.remove()
    }, 10000)

    addEventListener("click", () => {
      node.remove()
    }, { once: true })
  }
}
