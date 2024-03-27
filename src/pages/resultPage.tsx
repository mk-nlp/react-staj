import WeatherSitRepCloudyNight from '../assets/weather-condition-icons/Weather=Cloudy, Moment=Night.svg'
import WeatherSitRepCloudyDay from '../assets/weather-condition-icons/Weather=Cloudy, Moment=Day.svg'
import WeatherSitRepStormDay from '../assets/weather-condition-icons/Weather=Storm, Moment=Day.svg'
import WeatherSitRepStormNight from '../assets/weather-condition-icons/Weather=Storm, Moment=Night.svg'
import WeatherSitRepClearDay from '../assets/weather-condition-icons/Weather=Clear, Moment=Day.svg'
import WeatherSitRepClearNight from '../assets/weather-condition-icons/Weather=Clear, Moment=Night.svg'
import WeatherSitRepRainDay from '../assets/weather-condition-icons/Weather=Rain, Moment=Day.svg'
import WeatherSitRepRainNight from '../assets/weather-condition-icons/Weather=Rain, Moment=Night.svg'
import WeatherSitRepFewCloudsDay from '../assets/weather-condition-icons/Weather=Few clouds, Moment=Day.svg'
import WeatherSitRepFewCloudsNight from '../assets/weather-condition-icons/Weather=Few clouds, Moment=Night.svg'
import ThermalSensation from '../assets/weather-detail-icons/thermo-light.svg';
import RainProb from '../assets/weather-detail-icons/cloud-rain-light.svg'
import WindSpeed from '../assets/weather-detail-icons/Wind-light.svg'
import AirHumidity from '../assets/weather-detail-icons/drop-light.svg'
import UVIndexIcon from '../assets/weather-detail-icons/sun-light.svg'

import { Separator } from "@/components/ui/separator"
import { WeatherDetailContext } from '@/contexts/weatherDetailContext'
import { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'




const ResultPage = () => {
  // Context values come from the WeatherDetailContext, updated by the LandingPage at this stage of the application. 
  const { thermalSensation, probabilityOfPrecipitation, windSpeed, airHumidity, UVIndex, dayStage, cityName, day, weatherInterpretation } = useContext(WeatherDetailContext);
  const [currentIcon, UpdateCurrentIcon] = useState(WeatherSitRepClearDay);


  // The dayStageClassMap object maps the dayStage to a CSS class 
  //that will be used to style the background of weather result.
  // CSS classes are defined in tailwind.config.js
  const dayStageClassMap = {
    "Sunrise": "bg-sunset",
    "Morning": "bg-morning",
    "Noon": "bg-noon",
    "High Noon": "bg-high-noon",
    "Afternoon": "bg-afternoon",
    "Sunset": "bg-sunset",
    "Evening": "bg-evening",
    "Evening-2": "bg-evening-2",
    "Evening-3": "bg-evening-3",
    "Night": "bg-night"
  };
  
  const bgClass = dayStageClassMap[dayStage] || "bg-midnight";

  useEffect(() => {
    const dayStagesDay = ["Morning", "High Noon", "Afternoon", "Sunset", "Sunrise"];
    const dayStagesNight = ["Evening", "Evening-2", "Evening-3", "Night", "Midnight"];
    const words = weatherInterpretation.toLowerCase().split(' '); // Split the weatherInterpretation into words so we can check for weather conditions.
  
    const weatherIconsDay = {
      "rain": WeatherSitRepRainDay,
      "clear": WeatherSitRepClearDay,
      "overcast": WeatherSitRepCloudyDay,
      "storm": WeatherSitRepStormDay,
      "cloudy": WeatherSitRepFewCloudsDay
    };
  
    const weatherIconsNight = {
      "rain": WeatherSitRepRainNight,
      "clear": WeatherSitRepClearNight,
      "overcast": WeatherSitRepCloudyNight,
      "storm": WeatherSitRepStormNight,
      "cloudy": WeatherSitRepFewCloudsNight
    };
  
    for (let weatherCondition in weatherIconsDay) {
      if (words.includes(weatherCondition)) {
        if (dayStagesDay.includes(dayStage)) {
          UpdateCurrentIcon(weatherIconsDay[weatherCondition]);
          return;
        } else if (dayStagesNight.includes(dayStage)) {
          UpdateCurrentIcon(weatherIconsNight[weatherCondition]);
          return;
        }
      }
    }
  }, [dayStage, weatherInterpretation]);

  return (
    <div className="">
      <div className="grid grid-cols-3 grid-rows-2 gap-2 p-2">
          <div className={`${bgClass} grid col-span-3 row-span-1 p-2 rounded-2xl border-iwgray600 border-8`}>
            <div className="grid grid-cols-3 grid-rows-2 p-2">
              <div className="grid col-start-1 col-end-4 justify-items-start items-center">
                <div className=" font-sans font-bold">{cityName}</div>
                <div className=" font-sans">{day}</div>
              </div>
              <div className="grid row-start-3 row-end-4 justify-items-center items-end">
                <div className="text-6xl font-extrabold">{thermalSensation}°C</div>
              </div>
              <div className="grid  col-start-2 col-end-4 row-start-3 row-end-5">
                <img className=' w-64 h-60 ml-8' src={currentIcon} alt="WeatherSitRepCloudyNight" />
              </div>
              <div className="grid grid-rows-1 col-start-1 row-start-4 row-end-5">
                <div className="grid text-xl font-sans font-bold items-end">28°C / 32°C</div>
                <div className="font-sans text-xm ">{weatherInterpretation}</div>
              </div>
              
            </div>
          </div>
        
        <div className="grid  col-span-3 row-span-1 rounded-2xl grid-cols-5 p-4  grid-rows-0 bg-iwgray600">
          <div className=' grid  col-start-1 col-end-2 items-center justify-start'>
          <img className=' w-6' src={ThermalSensation} alt="UV Index" />
          </div>
          <div className='  grid col-start-2 col-end-4 items-center justify-start text-iwgray200 font-bold '>Thermal Sensation</div>
          <div className=' grid col-start-4 col-end-7 items-center justify-end text-xl font-bold'>{thermalSensation}°C</div>
          <Separator className='grid col-span-5 m-0 p-0 bg-gray-800' />
          
          
          <div className='grid col-start-1 cold-end-2 items-center justify-start'>
            <img className=' w-6' src={RainProb} alt="Rain Probability" />
          </div>
          <div className=' grid col-start-2 col-end-4 items-center justify-start text-iwgray200 font-bold'>Rain Probability</div>
          <div className=' grid col-start-4 col-end-7 items-center justify-end text-xl font-bold'>{probabilityOfPrecipitation}%</div>
          <Separator className='grid col-span-5 m-0 p-0 bg-gray-800' />
          
          <div className='grid col-start-1 cold-end-2 items-center justify-start'>
            <img className=' w-6' src={WindSpeed} alt="Wind Speed" />
          </div>
          <div className=' grid col-start-2 col-end-4 items-center justify-start text-iwgray200  font-bold'>Wind Speed</div>
          <div className=' grid col-start-4 col-end-7 items-center justify-end text-xl font-bold'>{windSpeed}km/h</div>
          <Separator className='grid col-span-5 m-0 p-0 bg-gray-800' />
          
          <div className='grid col-start-1 cold-end-2 items-center justify-start'>
            <img className=' w-6' src={AirHumidity} alt="Air Humidity" />
          </div>
          <div className=' grid col-start-2 col-end-4 items-center justify-start text-iwgray200  font-bold'>Air Humidity</div>
          <div className=' grid col-start-4 col-end-7 items-center justify-end text-xl font-bold'>{airHumidity}%</div>
          <Separator className='grid col-span-5 m-0 p-0  bg-gray-800' />
          
          <div className='grid col-start-1 cold-end-2 items-center justify-start'>
            <img className=' w-6' src={UVIndexIcon} alt="UV Index" />
          </div>
          <div className=' grid col-start-2 col-end-4 items-center justify-start text-iwgray200   font-bold'>UV Index</div>
          <div className=' grid col-start-4 col-end-7 items-center justify-end text-xl font-bold'>{UVIndex}%</div>
        

        </div>
        <div className="grid  col-span-3 rounded-2xl grid-cols-5 grid-rows-1 items-start bg-iwgray600 p-4">
          <div className=' grid col-start-1 col-end-2 items-center'>
            <div className="grid text-xl font-bold justify-center">Mon</div>
            <img className='grid w-18justify-center' src={WeatherSitRepCloudyNight} alt="WeatherSitRepCloudyNight" />
            <div className="grid font-bold font-sans justify-center">32°C</div>
            <div className="grid text-gray-500 font-bold font-sans justify-center">36°C</div>
          </div>
          <div className=' grid col-start-2 col-end-3 items-center'>
            <div className="grid text-xl font-bold justify-center">Tue</div>
            <img className='grid w-18 justify-center' src={WeatherSitRepClearNight} alt="WeatherSitRepCloudyNight" />
            <div className="grid font-bold font-sans justify-center">32°C</div>
            <div className="grid text-gray-500 font-bold font-sans justify-center">36°C</div>
          </div>
          <div className=' grid col-start-3 col-end-4 items-center'>
            <div className="grid text-xl font-bold justify-center">Wed</div>
            <img className='grid w-18 justify-center' src={WeatherSitRepFewCloudsNight} alt="WeatherSitRepCloudyNight" />
            <div className="grid font-bold font-sans justify-center">32°C</div>
            <div className="grid text-gray-500 font-bold font-sans justify-center">36°C</div>
          </div>
          <div className=' grid col-start-4 col-end-5 items-center'>
            <div className="grid text-xl font-bold justify-center">Thu</div>
            <img className='grid w-18 justify-center' src={WeatherSitRepRainNight} alt="WeatherSitRepCloudyNight" />
            <div className="grid font-bold font-sans justify-center">32°C</div>
            <div className="grid text-gray-500 font-bold font-sans justify-center">36°C</div>
          </div>
          <div className=' grid col-start-5 col-end-6 items-center'>
            <div className="grid text-xl font-bold justify-center">Fri</div>
            <img className='grid w-18 justify-center' src={WeatherSitRepFewCloudsNight} alt="WeatherSitRepCloudyNight" />
            <div className="grid font-bold font-sans justify-center">32°C</div>
            <div className="grid text-gray-500 font-bold font-sans justify-center">36°C</div>
          </div>
        </div>
        <div className=''>
          <Button className="flex items-center w-[300px] mt-5  bg-iwgray400  font-bold">
            Search for another location
            <ArrowRight className='w-6 h-6 ml-2' />
          </Button>
          </div>
        </div>
    </div>
  );
}

export default ResultPage;