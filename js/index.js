/*global Vue, VueRouter*/

import JsonHelper from './helpers/json.js'

const Unknown = () => import('./pages/unknown.js')
const Main = () => import('./pages/main.js')

Vue.config.devtools = location.hostname == 'localhost'

const routes = [
  { path: '*', component: Unknown },
  { path: '/', component: Main }
]

function logError(e) {
  const errors = JsonHelper.get('errors', () => [])
  errors.push(e.message + ' at ' + e.filename?.replace(/.*\/\/[^/]*/, '') + ':' + e.lineno)
  JsonHelper.set('errors', errors)
}
window.addEventListener('error', e => {
  logError(e)
})
Vue.config.errorHandler = e => {
  console.error(e)
  logError(e)
}

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

new Vue({
  router,
  el: '#app',
  mounted() {
    const loadingScreen = document.getElementById('loading_screen')
    loadingScreen.parentNode.removeChild(loadingScreen)
  }
})
