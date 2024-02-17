const template = document.createElement('template')
template.innerHTML = '<slot></slot>'

class PlayList extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.addEventListener('slotchange', this.handleSlotChange)
  }

  handleSlotChange = () => {
    this.elements.forEach((element) => this.#setup(element))
  }

  get autoplay() {
    return this.#attributeWithDefault('autoplay', true)
  }

  set autoplay(value) {
    return this.setAttribute('autoplay', value)
  }

  get loop() {
    return this.#attributeWithDefault('loop', false)
  }

  set loop(value) {
    return this.setAttribute('loop', value)
  }

  get shuffle() {
    return this.#attributeWithDefault('shuffle', false)
  }

  set shuffle(value) {
    return this.setAttribute('shuffle', value)
  }

  get elements() {
    return [...this.querySelectorAll('audio', 'video')]
  }

  #current = null

  set current(element) {
    if (this.#current !== element) {
      this.#current?.pause()
      this.#current?.removeAttribute('aria-current')

      this.#current = element
      this.#current?.setAttribute('aria-current', true)
    }
  }

  get current() {
    return this.#current
  }

  next = () => {
    const next = this.elements[this.#nextIndex]

    if (next) {
      this.current = next
      this.current.load()
      this.current.currentTime = 0
      this.current.play()
    }
  }

  // Private

  #setup(element) {
    element.addEventListener('play', this.#setCurrent)
    element.addEventListener('ended', this.#autoplayNext)
  }

  #setCurrent = ({ target }) => {
    this.current = target
  }

  #autoplayNext = () => {
    if (this.autoplay) this.next()
  }

  get #nextIndex() {
    const currentIndex = this.elements.indexOf(this.current)

    if (this.shuffle) {
      const indexesWithoutCurrent = [
        ...Array(this.elements.length).keys()
      ].reduce(
        (accumulator, i) =>
          i === currentIndex ? accumulator : [...accumulator, i],
        []
      )
      return indexesWithoutCurrent[Math.floor(Math.random() * indexes.length)]
    } else {
      return currentIndex === this.elements.length - 1 && this.loop
        ? 0
        : index + 1
    }
  }

  #attributeWithDefault(name, defaultValue) {
    if (this.hasAttribute(name)) {
      return this.getAttribute(name) !== 'false'
    } else {
      return defaultValue
    }
  }
}

customElements.define('play-list', PlayList)
