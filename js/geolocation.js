function geolocationSupport () {
  // if ('geolacation' in navigatos) {
  //   return true
  // }
  // return false

  return 'geolocation' in navigator
}

const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge : 10000000
}

export function getCurrentPosition(options = defaultOptions) {
  if(!geolocationSupport()) throw new Error('No hay soporte de geolocatización en tu navegador')

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      resolve(position)
    },()=>{
      reject('No hemos podido obtener tu ubicación')
    }, options)
  })

}

export async function getLatLon(options = defaultOptions) {
  try {
    const {coords: { latitude, longitude }} = await getCurrentPosition(options)
    return {latitude, longitude, isError: false}
  } catch {
    return {isError: true, latitude: null, longitude: null}
  }
}