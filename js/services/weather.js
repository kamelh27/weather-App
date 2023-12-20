import { API_KEY, BASE_API } from '../constants.js'

export async function getCurrentWeather(latitude, longitude) {
  const response = await fetch(`${BASE_API}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
  if(!response.ok) return {
    isError: true,
    data: null
  }
  const data = await response.json()
  return {
    isError: false,
    data,
  }
}

export async function getWeeklyWeather(latitude, longitude) {
  const response = await fetch(`${BASE_API}forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
  if(!response.ok) return {
    isError: true,
    data: null
  }
  const data = await response.json()
  return {
    isError: false,
    data,
  }
}