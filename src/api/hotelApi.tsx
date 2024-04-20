import axios from "axios";

export async function getHotels(city: string, country: string) {
    const BASE_URL = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:900];area["name:en"="${country}"]->.country;area["name:en"="${city}"](area.country)->.city;(+node["tourism"="hotel"](area.city););(._;>;);out+geom;`;
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