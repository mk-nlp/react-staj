const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=\{\}&longitude=\{\}&current=weather_code&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m,uv_index,is_day&timezone=auto'

export async function getWeatherDetails(latitude, longitude) {
  const response = await fetch(API_URL.replace('\{\}', latitude).replace('\{\}', longitude))
  const data = await response.json()
  return data
}
