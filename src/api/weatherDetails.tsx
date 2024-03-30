import axios from "axios";

export async function getWeatherDetails(latitude: number, longitude: number) {
  const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
  try {
    const response = await axios.get(API_URL);
    if (response.status !== 200) {
      return "HTTP error! status: " + response.status;
    }
    return response.data;
  } catch (error) {
    return error;
  }
}
