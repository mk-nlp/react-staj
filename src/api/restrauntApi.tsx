import axios from "axios";

export async function getRestraunt(city: string, country: string) {
    const BASE_URL = `https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A900%5D%3B%0Aarea%5B%22name%3Aen%22%3D%22${country}%22%5D-%3E.country%3B%0Aarea%5B%22name%3Aen%22%3D%22${city}%22%5D(area.country)-%3E.city%3B%0A(%0A+node%5B%22amenity%22%3D%22restaurant%22%5D(area.city)%3B%0A)%3B%0A(._%3B%3E%3B)%3B%0Aout+geom%3B`;
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