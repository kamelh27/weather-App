import { getWeeklyWeather } from './services/weather.js'
import { getLatLon } from './geolocation.js'
import { formatWeekList } from './utils/format-date.js'
import { createDow } from './utils/dom.js'
import { createPeriodTime, } from './period-time.js'
import draggable from './draggable.js'



function tabPanelTemplate(id) {
  return `
  <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
    <div class="dayWeather" id="dayWeather-${id}">
      <ul class="dayWeather-list" id="dayWeather-list-${id}">
      </ul>
    </div>
  </div>
  `
}

function createTabPanel (id) {
  const $panel = createDow(tabPanelTemplate(id))
  if( id > 0) {
    $panel.hidden = true
  }
  return $panel
}

function configWeeklyWeather (weeklist) {
  const $container = document.querySelector('.tabs')


  weeklist.forEach((day, tabPanelIndex) => {
    const $panel = createTabPanel(tabPanelIndex)
    $container.append($panel)

    const $listPanel = document.querySelector(`#dayWeather-list-${tabPanelIndex}`)

    day.forEach((weather,  weatherIndex) => {
      const $periodTime = createPeriodTime(weather, tabPanelIndex, weatherIndex)
      $listPanel.append($periodTime)
    })
  })
}




export async function weeklyWeather () {
  const $container = document.querySelector('.weeklyWeather')

  const { latitude, longitude, isError } = await getLatLon()
  if(isError) return console.log('A ocurrido un error')

  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(latitude, longitude)
  if(weeklyWeatherError) return console.log('A ocurrido un error')

  const weeklist = formatWeekList(weather.list)
  configWeeklyWeather(weeklist)
  draggable($container)

  const $dayWeatherList = document.querySelectorAll('.dayWeather-item')
  $dayWeatherList.forEach(($dayWeather, index) => {
    $dayWeather.addEventListener('click', handleSelectDayWeather)
  })

  function handleSelectDayWeather(event) {
    const $dayWeatherSelected = event.currentTarget
    const $parentTarget = $dayWeatherSelected.parentElement
    const $dayWeatherActive = $parentTarget.querySelector('.dayWeather-item.is-selected')

    const partialId = $dayWeatherSelected.dataset.weatheritem
    const $atmosphericVarSelected = document.getElementById(`dayAtmosphere-${partialId}`)
    const $grandParentTarget = $parentTarget.parentElement
    const $atmosphericVarActive = $grandParentTarget.querySelector('.infoDayWeather:not(.is-hidden)')

    if ($dayWeatherActive !== $dayWeatherSelected) {
        $dayWeatherActive.classList.remove('is-selected');
        $dayWeatherSelected.classList.toggle('is-selected');

        $atmosphericVarSelected.classList.remove('is-hidden');
        $atmosphericVarActive.classList.toggle('is-hidden');
    }
  }

}