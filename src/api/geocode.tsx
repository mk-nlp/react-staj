import axios from "axios";

export async function getGeocode(city: string) {
  const BASE_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=3&language=en&format=json`;
  try {
    const response = await axios.get(BASE_URL);
    if (response.status !== 200) {
      return "HTTP error! status: " + response.status;
    }
    return response.data;
  } catch (error) {
    return error;
  }
}