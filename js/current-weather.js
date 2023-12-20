// import weather from '../data/current-weather.js'
import { formatDate, formatTemp } from './utils/format-date.js'
import { weatherConditionsCodes } from './constants.js'
import { getLatLon } from './geolocation.js'
import { getCurrentWeather } from './services/weather.js'

function setCurrentDate ($elemento) {
  const date = new Date()
  const formattedDate = formatDate(date)
  $elemento.textContent =  formattedDate
}

function setCurrentCity($elemento, city) {
  $elemento.textContent = city
}

function setCurrentTemp ($elemento, temp) {
  $elemento.textContent = formatTemp(temp)
}

function solarStatus(sunriseTime, sunsetTime) {
  const currentHours = new Date().getHours()
  const sunsetHours = sunsetTime.getHours()
  const sunriseHours = sunriseTime.getHours()
  if(currentHours > sunsetHours || currentHours < sunriseHours) {
    return 'night'
  }
  return 'morning'
}

function showCurrentWeather ($app, $loading) {
  $app.hidden = false
  $loading.hidden = true
} 

function setBackground ($elemento, conditionCode, solarStatus) {
  const weatherType = weatherConditionsCodes[conditionCode]
  const size =  window.matchMedia('(-webkit-min-device-pixel-ratio:2)').matches ? '@2x' : '';
  $elemento.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`
}

function configCurrentWeather (weather) {
  const $app = document.querySelector('#app')
  const $loading = document.querySelector('#loading')

  showCurrentWeather($app, $loading)

  //hora
  const $currentWeatherDate = document.querySelector('#current-weather-date') 
  setCurrentDate($currentWeatherDate)

  //ciudad
  const $currentWeatherCity=  document.querySelector('#current-weather-city')
  const city = weather.name
  setCurrentCity($currentWeatherCity,city)


  //temperatura
  const $currentWeatherTemp = document.querySelector('#current-weather-temp')
  const temp = weather.main.temp
  setCurrentTemp($currentWeatherTemp, temp)


  //background
  const sunriseTime = new Date(weather.sys.sunrise * 1000)
  const sunsetTime = new Date(weather.sys.sunset * 1000)
  const conditionCode = String(weather.weather[0].id).charAt(0)
  setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime))
}

export default async function currentWeather () {
  // Geo // API - WEATHER // Config
  const { latitude, longitude, isError } = await getLatLon()
  if(isError) return console.log('Ah ocurrido un error ubicandote')
  // console.log(latitude, longitude)
 
  // .then((data) => {
  //   console.log('exitos', data)
  // }).catch((message) => {
  //   console.log(message)
  // })
  const { isError: currentWeatherError, data: weather} = await getCurrentWeather(latitude, longitude)
  if(currentWeatherError) return console.log('Un error')
  configCurrentWeather(weather)
} 