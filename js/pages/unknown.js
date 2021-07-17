export default {
  name: 'unknown',
  template:
  `<main>
    <h2>Page Not Found</h2>
    <p class="mb-16">Unfortunately the site you requested does not exist!</p>
    <button type="button" v-on:click="$router.push('/')">Back To Main Menu</button>
  </main>`
}
