/*global Vue, VueRouter*/

import JsonHelper from './helpers/json.js'

const Unknown = () => import('./pages/unknown.js')
const Main = () => import('./pages/main.js')
const Dialog = () => import('./pages/dialog.js')
const Map = () => import('./pages/map.js')

Vue.config.devtools = location.hostname == 'localhost'

const routes = [
  { path: '*', component: Unknown },
  { path: '/', component: Main },
  { path: '/d', component: Dialog },
  { path: '/m', component: Map }
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

function isMobile() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ]
  return toMatch.some(toMatchItem => navigator.userAgent.match(toMatchItem))
}

window.isMobile = isMobile()

const settings = JsonHelper.get('settings', () => {
  return {
    graphics: 'high'
  }
})
window.settings = new Proxy(settings, {
  set(obj, prop, value) {
    obj[prop] = value
    JsonHelper.set('settings', obj)
    return true
  }
})

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
