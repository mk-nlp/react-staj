
import * as React from "react"
import { useState, useContext, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { SearchSuccessContext } from "@/contexts/searchContext"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import SpinnerIcon from "@/assets/weather-detail-icons/spinner-gap.svg"
import { getGeocode } from "@/api/geocode"
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
  CommandInputWithoutIcon,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { motion } from "framer-motion"

import { WeatherDetailContext, WeatherDetailProvider } from "@/contexts/weatherDetailContext"
import { getWeatherDetails } from "@/api/weatherDetails"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"



export function ComboboxDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const { updateSearchSuccess, searchSuccess } = useContext(SearchSuccessContext);
  const [loading, setLoading ] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cities, setCities] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const [hourIndex, setHourIndex] = useState(0);
  const { updateWeatherDetails } = useContext(WeatherDetailContext);
  const [timeOffSet, setTimeOffSet] = useState(0);
  const [timeDifference, setTimeDifference] = useState(0);
  const weatherDetails = useContext(WeatherDetailContext);


// WMO Codes for weather interpretation
// Check https://open-meteo.com/en/docs/ for more information
  const wmoCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Heavy Drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Dense freezing rain",
    71: "Slight snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Thunderstorm with heavy hail",
  }


// Function to set the day stage based on the local time
  function setDayStage(localTime) {
    if (localTime.getHours() >= 5 && localTime.getHours() < 6) 
    {
      return "Sunrise";
    }
    else if (localTime.getHours() >= 6 && localTime.getHours() < 12) {
      return "Morning";
    }
    else if (localTime.getHours() >= 12 && localTime.getHours() < 14) {
      return "High Noon";
    }
    else if (localTime.getHours() >= 14 && localTime.getHours() < 17) {
      return "Afternoon";
    }
    else if (localTime.getHours() >= 17 && localTime.getHours() < 18) {
      return "Sunset";
    }
    else if (localTime.getHours() >= 18 && localTime.getHours() < 20) {
      return "Evening";
    }
    else if (localTime.getHours() >= 20 && localTime.getHours() < 21) {
      return "Evening-2";
    }
    else if (localTime.getHours() >= 21 && localTime.getHours() < 22) {
      return "Evening-3";
    }
    else if (localTime.getHours() >= 22 && localTime.getHours() < 23) {
      return "Night";
    }
    else {
      return "Midnight";
    }
  }
  
  // Function to get the day based on the local time
  function getDay(localTime) {
    const day = localTime.getDay();
    const month = localTime.getMonth();
    const year = localTime.getFullYear();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return days[day] + ", " + months[month] + " " + localTime.getDate() + ", " + year;
  }
  


  function mockApiCall() {
    setLoading(true);
     // At this point the cities array should have only one element
     // as it has been filtered by the user's selection 
    getWeatherDetails(cities[0].latitude, cities[0].longitude) 
      .then((data) => {
        // Get the UTC offset in seconds from the API response
        setTimeOffSet(data.utc_offset_seconds);
        // Get the current UTC time in milliseconds
        const utcTimeInMS = new Date().getTime();
        // Calculate the target time based on the UTC offset and the local time
        // I really hate working with timezones >:(
        const targetTime = new Date(utcTimeInMS + data.utc_offset_seconds * 1000 + new Date().getTimezoneOffset() * 60 * 1000);
        let hourIndexCalc = targetTime.getHours();
        // Data to be mapped to the weather details context
        const mappedData = {
          thermalSensation: data.hourly.temperature_2m[hourIndexCalc],
          probabilityOfPrecipitation: data.hourly.precipitation_probability[hourIndexCalc],
          windSpeed: data.hourly.wind_speed_10m[hourIndexCalc],
          airHumidity: data.hourly.relative_humidity_2m[hourIndexCalc],
          UVIndex: data.hourly.uv_index[hourIndexCalc],
          dayStage: setDayStage(targetTime),
          cityName: cities[0].value,
          day: getDay(targetTime),
          weatherInterpretation: wmoCodes[data.current.weather_code],
        };
        updateWeatherDetails(mappedData);
        updateSearchSuccess(true);
        setLoading(false);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }





// Function to call the geocode API
// Run when the debounced input value is updated
// This function is debounced to prevent too many API 
// calls in a short time, been there, done that :(
function ApiCall(inputValue : string) {
  getGeocode(inputValue)
  .then((data) => {
    if (data.results) {
      setCities(data.results.map((city) => ({
        id: city.id,
        label: city.name + ", " + city.admin1 + "- " + city.country,
        value: city.name + ", " + city.country,
        latitude: city.latitude,
        longitude: city.longitude,
      })))
      return cities
    } else {
      console.error('Data is not an array')
    }
  })
  .catch((error) => {
    console.log(error)
  })
}



// Here is the debounce useEffect, waits for 
// a second which is enough I think.
useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedInputValue(inputValue);
  }, 1000);

  return () => {
    clearTimeout(handler);
  };
}, [inputValue]);

// Here is the debounce API call, waits for 
// a second which is enough I think.
useEffect(() => {
  if (debouncedInputValue.length > 2) {
    ApiCall(debouncedInputValue);
  }
}, [debouncedInputValue]);

// Okay, so this is really stupid but I had to convert the Turkish characters
// to English characters because the component doesn't autocomplete the Turkish
// characters. I know, I know, it's stupid but was too deep into the project
// to change the component. So here is the function to convert the Turkish
// characters to English characters.
function converTurkishCharacters(inputValue : string) {
  const map = {
    'ı': 'i',
    'İ': 'i',
    'ş': 'ş',
    'Ş': 'ş',
    'ğ': 'ğ',
    'Ğ': 'ğ',
    'ç': 'ç',
    'Ç': 'ç',
    'ö': 'ö',
    'Ö': 'ö',
    'ü': 'ü',
    'Ü': 'ü'
  };
  // Yeah and also had to convert the input to lowercase :D, I know, I know
  // I'm sorry, I'm sorry, I'm sorry, I'm sorry, I'm sorry, I'm sorry, I'm sorry
  return inputValue.replace(/[ıİşŞğĞçÇöÖüÜ]/g, (ch) => map[ch]).toLowerCase();
}




function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
      const later = () => {
          clearTimeout(timeout);
          func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
  };
};




  return (
    // This includes a modified version of the CommandInputIcon that removes the search icon
    // Go to definition to see the changes
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between bg-iwgray600 text-iwgray200"
        >
          {value
            ? cities.find((city) => city.value === value)?.label
            : "Search Location"}
          {loading ? (
            <motion.div 
            animate={{ 
              rotate: 360 
            }} 
            transition={{ 
              duration: 1, 
              repeat: Infinity 
            }}
          >
            <img 
              src={SpinnerIcon} 
              alt="loading" 
              className="w-6 h-6" 
            />
          </motion.div>
          ) : (
            null
          )}

          {loaded ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            null
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-iwgray600">
        <Command className=" bg-iwgray600 text-white">
        <CommandInputWithoutIcon
  value={displayValue}
  onValueChange={(value) => {
    const convertedValue = converTurkishCharacters(value);
    setInputValue(convertedValue);
    setDisplayValue(convertedValue);
  }} 
/>
          <CommandEmpty>
         <Button className="w-[300px] justify-evenly bg-iwgray600 text-iwgray200">
         Searching...
         <motion.div 
            animate={{ 
              rotate: 360 
            }} 
            transition={{ 
              duration: 1, 
              repeat: Infinity 
            }}
          >
            <img 
              src={SpinnerIcon} 
              alt="loading" 
              className="w-6 h-6" 
            />
          </motion.div>
         </Button>
          </CommandEmpty>
          <CommandList className=" bg-iwgray600">
            {cities.map((city) => (
              <CommandItem
                key={city.id}
                value={city.label}
                disabled={disabled}
                onSelect={() => {
                  setValue(city.value)
                  setCities([{
                    id: city.id,
                    label: city.label,
                    value: city.value,
                    latitude: city.latitude,
                    longitude: city.longitude,
                  }])
                  setOpen(false)
                  setDisabled(true)
                  mockApiCall()
                  console.log(searchSuccess)
                }}
              >
                {city.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

