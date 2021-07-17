export default {
  name: 'page',
  props: {
    title: String,
    parent: String
  },
  template:
  `<div>
    <header>
      <router-link :to="parent ? parent : '/'">
        <span class="material-icons-round nav-icon" role="button" aria-label="Back">{{ parent ? 'arrow_back' : 'close' }}</span>
      </router-link>
      <h1 class="with-nav-icon">{{ title }}</h1>
    </header>
    <main class="with app-bar zoom-in-animation">
      <slot></slot>
    </main>
  </div>`
}
