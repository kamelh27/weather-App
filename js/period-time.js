import { createDow } from './utils/dom.js'
import { formatDate, formatTemp, formatHumidity, formatWindSpeed} from './utils/format-date.js'




export function periodTimeTemplate(config, tabPanelIndex, weatherIndex ) {

  const $tabPanel = document.getElementById(`dayWeather-${tabPanelIndex}`)
  const $atmosphere = createDow(periodHumidityWind(config, tabPanelIndex, weatherIndex))
  $tabPanel.append($atmosphere)

  return `
  <li class="dayWeather-item ${weatherIndex === 0 ? 'is-selected' : ''}" data-weatherItem='tp${tabPanelIndex}-w${weatherIndex}'>
    <span class="dayWeather-time">${config.date}</span>
      <img class="dayWeather-icon"  height='48' width='48' src="https://openweathermap.org/img/wn/${config.icon}@2x.png" alt="${config.description}" rain="">
    <span class="dayWeather-temp">${config.temp}</span>
  </li>
  `
}


export function periodHumidityWind(config, tabPanelIndex, weatherIndex) {
  return ` 
  <div id="dayAtmosphere-tp${tabPanelIndex}-w${weatherIndex}" class="infoDayWeather ${weatherIndex !== 0 ? 'is-hidden' : '' } ">
  <div class="temperatureDay-max-min">
    <p class="temperatureDay-max">
      <span class="day-max">Máx:</span>
      <span id="day-atmosphere-${tabPanelIndex}" class="day-degree">${config.tempMax}</span>
    </p>
    <p class="temperatureDay-min">
      <span class="day-min">Mín:</span>
      <span id="day-atmosphere-${tabPanelIndex}" class="day-degree">${config.tempMin}</span>
    </p>
  </div>
  <div class="weather-humidity-wind">
    <p class="weather-wind">
      <span class="wind">Viento:</span>
      <span id="wind-atmosphere-${tabPanelIndex}" class="wind-kilometres">${config.windSpeed} Km-h</span>
    </p>
    <p class="weather-humidity">
      <span class="humidity">Humedad:</span>
      <span id="humidity-atmosphere-${tabPanelIndex}" class="humidity-porcentage">${config.humidity}</span>
    </p>
  </div>
</div>`
}

export function createPeriodTime(weather, tabPanelIndex, weatherIndex) {

  const dateOptions = {
    hour: 'numeric',
    hour12: true,
  }

  const temp = formatTemp(weather.main.temp)
  const date = formatDate(new Date(weather.dt * 1000), dateOptions)
  const humidity = formatHumidity(weather.main.humidity)
  const windSpeed = formatWindSpeed(weather.wind.speed)
  const tempMax = formatTemp(weather.main.temp_max)
  const tempMin = formatTemp(weather.main.temp_min)

  const config = {
    temp,
    date,
    humidity,
    windSpeed,
    tempMax,
    tempMin,
    icon: weather.weather[0].icon,
    description: weather.weather[0].description
  }
  return createDow(periodTimeTemplate(config, tabPanelIndex, weatherIndex))
}


