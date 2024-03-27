
const BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search?name=\{\}&count=3&language=en&format=json'

export async function getGeocode(city) {
  try {
    const response = await fetch(BASE_URL.replace('\{\}', city))
    if (!response.ok) {
      return "HTTP error! status: " + response.status
    }
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}