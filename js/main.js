import currentWeather from './current-weather.js'
import { viewportSize } from './utils/vierwport.js'
import './tabs.js'
import { weeklyWeather } from './weekly-weather.js'

const $app = document.querySelector('#app')
const $loading = document.querySelector('#loading')

viewportSize($app)
viewportSize($loading)

currentWeather()
weeklyWeather()