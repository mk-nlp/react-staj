import WeatherSitRepCloudyNight from "../assets/weather-condition-icons/Weather=Cloudy, Moment=Night.svg";
import WeatherSitRepCloudyDay from "../assets/weather-condition-icons/Weather=Cloudy, Moment=Day.svg";
import WeatherSitRepStormDay from "../assets/weather-condition-icons/Weather=Storm, Moment=Day.svg";
import WeatherSitRepStormNight from "../assets/weather-condition-icons/Weather=Storm, Moment=Night.svg";
import WeatherSitRepClearDay from "../assets/weather-condition-icons/Weather=Clear, Moment=Day.svg";
import WeatherSitRepClearNight from "../assets/weather-condition-icons/Weather=Clear, Moment=Night.svg";
import WeatherSitRepRainDay from "../assets/weather-condition-icons/Weather=Rain, Moment=Day.svg";
import WeatherSitRepRainNight from "../assets/weather-condition-icons/Weather=Rain, Moment=Night.svg";
import WeatherSitRepFewCloudsDay from "../assets/weather-condition-icons/Weather=Few clouds, Moment=Day.svg";
import WeatherSitRepFewCloudsNight from "../assets/weather-condition-icons/Weather=Few clouds, Moment=Night.svg";
import ThermalSensation from "../assets/weather-detail-icons/thermo-light.svg";
import RainProb from "../assets/weather-detail-icons/cloud-rain-light.svg";
import WindSpeed from "../assets/weather-detail-icons/Wind-light.svg";
import AirHumidity from "../assets/weather-detail-icons/drop-light.svg";
import UVIndexIcon from "../assets/weather-detail-icons/sun-light.svg";

import { Separator } from "@/components/ui/separator";
import { WeatherDetailContext } from "@/contexts/weatherDetailContext";
import { SearchSuccessContext } from "@/contexts/searchContext";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { SearchIcon } from "lucide-react";
import { PreviousCitiesContext } from "@/contexts/previousCitiesContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ResultPage = () => {
  // Context values come from the WeatherDetailContext, updated by the LandingPage at this stage of the application.
  const {
    thermalSensation,
    probabilityOfPrecipitation,
    windSpeed,
    airHumidity,
    UVIndex,
    dayStage,
    cityName,
    day,
    weatherInterpretation,
    dailyInterpretation,
    dailyMaxTemperature,
    dailyMinTemperature,
  } = useContext(WeatherDetailContext);
  const [currentIcon, UpdateCurrentIcon] = useState(WeatherSitRepClearDay);
  const fourDaysAfter = useFourDaysAfterToday();
  const { updateSearchSuccess } = useContext(SearchSuccessContext);
  const { clearLocalStorage } = useContext(PreviousCitiesContext);
  const [open, setOpen] = useState(false);
  const [dailyIcons, setDailyIcons] = useState([]); // This state is used to store the daily weather icons.

  function useFourDaysAfterToday() {
    // The day value is in the format "day, month dayOfMonth, year". We only need the day.
    const { day } = useContext(WeatherDetailContext);
    // Split by comma and get the first element, which is the day.
    let findDay = day.split(",")[0];
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let currentDay = days.indexOf(findDay);
    // The modulo operator is used to wrap around the days array.
    let nextDay1 = (currentDay + 1) % days.length;
    let nextDay2 = (currentDay + 2) % days.length;
    let nextDay3 = (currentDay + 3) % days.length;
    let nextDay4 = (currentDay + 4) % days.length;

    return [
      days[currentDay],
      days[nextDay1],
      days[nextDay2],
      days[nextDay3],
      days[nextDay4],
    ];
  }

  // The dayStageClassMap object maps the dayStage to a CSS class
  //that will be used to style the background of weather result.
  // CSS classes are defined in tailwind.config.js
  const dayStageClassMap: { [key: string]: string } = {
    Sunrise: "bg-sunset",
    Morning: "bg-morning",
    Noon: "bg-noon",
    "High Noon": "bg-high-noon",
    Afternoon: "bg-afternoon",
    Sunset: "bg-sunset",
    Evening: "bg-evening",
    "Evening-2": "bg-evening-2",
    "Evening-3": "bg-evening-3",
    Night: "bg-night",
  };
  const bgClass = dayStageClassMap[dayStage] || "bg-midnight";

  useEffect(() => {
    const dayStagesDay = [
      "Morning",
      "High Noon",
      "Afternoon",
      "Sunset",
      "Sunrise",
    ];
    const dayStagesNight = [
      "Evening",
      "Evening-2",
      "Evening-3",
      "Night",
      "Midnight",
    ];
    let dailyIcons = [];
    const words = weatherInterpretation.toLowerCase().split(" "); // Split the weatherInterpretation into words so we can check for weather conditions.
    const dailyInterpretationWords = (dailyInterpretation as string[]).map(
      (interpretation) => interpretation.toLowerCase().split(" ")
    );

    const weatherIconsDay = {
      rain: WeatherSitRepRainDay,
      clear: WeatherSitRepClearDay,
      overcast: WeatherSitRepCloudyDay,
      storm: WeatherSitRepStormDay,
      cloudy: WeatherSitRepFewCloudsDay,
      fog: WeatherSitRepCloudyDay,
      drizzle: WeatherSitRepRainDay,
      showers: WeatherSitRepRainDay,
      thunderstorm: WeatherSitRepStormDay,
      snowfall: WeatherSitRepRainDay,
      grains: WeatherSitRepRainDay,
    };

    const weatherIconsNight: { [key: string]: string } = {
      rain: WeatherSitRepRainNight,
      clear: WeatherSitRepClearNight,
      overcast: WeatherSitRepCloudyNight,
      storm: WeatherSitRepStormNight,
      cloudy: WeatherSitRepFewCloudsNight,
      fog: WeatherSitRepCloudyNight,
      drizzle: WeatherSitRepRainNight,
      showers: WeatherSitRepRainNight,
      thunderstorm: WeatherSitRepStormNight,
      snowfall: WeatherSitRepRainNight,
      grains: WeatherSitRepRainNight,
    };

    for (let i = 0; i < dailyInterpretationWords.length; i++) {
      for (let weatherCondition in weatherIconsDay) {
        if (
          dailyInterpretationWords[i].some((word) => word === weatherCondition)
        ) {
          dailyIcons.push(
            weatherIconsDay[weatherCondition as keyof typeof weatherIconsDay]
          );
        }
      }
    }
    setDailyIcons(dailyIcons as never[]);

    for (let weatherCondition in weatherIconsDay) {
      if (words.includes(weatherCondition)) {
        if (dayStagesDay.includes(dayStage)) {
          UpdateCurrentIcon(
            weatherIconsDay[weatherCondition as keyof typeof weatherIconsDay]
          );
          return;
        } else if (dayStagesNight.includes(dayStage)) {
          UpdateCurrentIcon(
            weatherIconsNight[
              weatherCondition as keyof typeof weatherIconsNight
            ]
          );
          return;
        }
      }
    }
  }, [dayStage, weatherInterpretation, dailyInterpretation]);

  useEffect(() => {}, [dailyIcons]);

  return (
    <div>
      <div className="grid grid-cols-3 grid-rows-2 gap-2 p-2 md:grid-cols-5">
        <div
          className={`${bgClass} bg-cover bg-center grid col-span-3 row-span-1 p-2 rounded-2xl border-iwgray600 border-8 md:col-start-2`}
        >
          <div className="grid grid-cols-3 grid-rows-2 p-2">
            <div className="grid col-start-1 col-end-4 justify-items-start items-center">
              <div className=" font-sans font-bold">{cityName}</div>
              <div className=" font-sans">{day}</div>
            </div>
            <div className="grid row-start-3 row-end-4 justify-items-center items-end">
              <div className="text-6xl font-extrabold">
                {Math.round(thermalSensation)}°C
              </div>
            </div>
            <div className="grid  col-start-2 col-end-4 row-start-3 row-end-5">
              <img
                className=" w-64 h-60 ml-8 lg:ml-24 xl:ml-44"
                src={currentIcon}
                alt="WeatherSitRepCloudyNight"
              />
            </div>
            <div className="grid grid-rows-1 col-start-1 row-start-4 row-end-5">
              <div className="grid text-xl font-sans font-bold items-end">
                {Math.round(dailyMinTemperature[0])}°C /{" "}
                {Math.round(dailyMaxTemperature[0])}°C
              </div>
              <div className="font-sans text-xm ">{weatherInterpretation}</div>
            </div>
          </div>
        </div>

        <div className="grid  col-span-3 row-span-1 rounded-2xl grid-cols-5 p-4  grid-rows-0 bg-iwgray600 md:col-start-2">
          <div className=" grid  col-start-1 col-end-1 items-center justify-start">
            <img className=" w-6" src={ThermalSensation} alt="UV Index" />
          </div>
          <div className="  grid col-start-2 col-end-4 items-center justify-start text-iwgray200 font-bold ">
            Thermal Sensation
          </div>
          <div className=" grid col-start-4 col-end-7 items-center justify-end text-xl font-bold">
            {thermalSensation}°C
          </div>
          <Separator className="grid col-span-5 m-0 p-0 bg-gray-800" />

          <div className="grid col-start-1 cold-end-2 items-center justify-start">
            <img className=" w-6" src={RainProb} alt="Rain Probability" />
          </div>
          <div className=" grid col-start-2 col-end-4 items-center justify-start text-iwgray200 font-bold">
            Rain Probability
          </div>
          <div className=" grid col-start-4 col-end-7 items-center justify-end text-xl font-bold">
            {probabilityOfPrecipitation}%
          </div>
          <Separator className="grid col-span-5 m-0 p-0 bg-gray-800" />

          <div className="grid col-start-1 cold-end-2 items-center justify-start">
            <img className=" w-6" src={WindSpeed} alt="Wind Speed" />
          </div>
          <div className=" grid col-start-2 col-end-4 items-center justify-start text-iwgray200  font-bold">
            Wind Speed
          </div>
          <div className=" grid col-start-4 col-end-7 items-center justify-end text-xl font-bold">
            {windSpeed}km/h
          </div>
          <Separator className="grid col-span-5 m-0 p-0 bg-gray-800" />

          <div className="grid col-start-1 cold-end-2 items-center justify-start">
            <img className=" w-6" src={AirHumidity} alt="Air Humidity" />
          </div>
          <div className=" grid col-start-2 col-end-4 items-center justify-start text-iwgray200  font-bold">
            Air Humidity
          </div>
          <div className=" grid col-start-4 col-end-7 items-center justify-end text-xl font-bold">
            {airHumidity}%
          </div>
          <Separator className="grid col-span-5 m-0 p-0  bg-gray-800" />

          <div className="grid col-start-1 cold-end-2 items-center justify-start">
            <img className=" w-6" src={UVIndexIcon} alt="UV Index" />
          </div>
          <div className=" grid col-start-2 col-end-4 items-center justify-start text-iwgray200   font-bold">
            UV Index
          </div>
          <div className=" grid col-start-4 col-end-7 items-center justify-end text-xl font-bold">
            {UVIndex}%
          </div>
        </div>
        <div className="grid  col-span-3 rounded-2xl grid-cols-5 grid-rows-1 items-start bg-iwgray600 p-4 md:col-start-2">
          <div className=" grid col-start-1 col-end-2 items-center">
            <div className="grid text-xl font-bold justify-center items-center">
              {fourDaysAfter[0].slice(0, 3)}
            </div>
            <img
              className="grid w-96 h-50 justify-center"
              src={dailyIcons[0]}
              alt="WeatherSitRepCloudyNight"
            />
            <div className="grid font-bold font-sans justify-center">
              {Math.round(dailyMinTemperature[0])}°C
            </div>
            <div className="grid text-gray-500 font-bold font-sans justify-center">
              {Math.round(dailyMaxTemperature[0])}°C
            </div>
          </div>
          <div className=" grid col-start-2 col-end-3 items-center">
            <div className="grid text-xl font-bold justify-center">
              {fourDaysAfter[1].slice(0, 3)}
            </div>
            <img
              className="grid w-96  h-50 justify-center"
              src={dailyIcons[1]}
              alt="WeatherSitRepCloudyNight"
            />
            <div className="grid font-bold font-sans justify-center">
              {Math.round(dailyMinTemperature[1])}°C
            </div>
            <div className="grid text-gray-500 font-bold font-sans justify-center">
              {Math.round(dailyMaxTemperature[1])}°C
            </div>
          </div>
          <div className=" grid col-start-3 col-end-4 items-center">
            <div className="grid text-xl font-bold justify-center">
              {fourDaysAfter[2].slice(0, 3)}
            </div>
            <img
              className="grid w-96  h-50 justify-center"
              src={dailyIcons[2]}
              alt="WeatherSitRepCloudyNight"
            />
            <div className="grid font-bold font-sans justify-center">
              {Math.round(dailyMinTemperature[2])}°C
            </div>
            <div className="grid text-gray-500 font-bold font-sans justify-center">
              {Math.round(dailyMaxTemperature[2])}°C
            </div>
          </div>
          <div className=" grid col-start-4 col-end-5 items-center">
            <div className="grid text-xl font-bold justify-center">
              {fourDaysAfter[3].slice(0, 3)}
            </div>
            <img
              className="grid w-96  h-50 justify-center"
              src={dailyIcons[3]}
              alt="WeatherSitRepCloudyNight"
            />
            <div className="grid font-bold font-sans justify-center">
              {Math.round(dailyMinTemperature[3])}°C
            </div>
            <div className="grid text-gray-500 font-bold font-sans justify-center">
              {Math.round(dailyMaxTemperature[3])}°C
            </div>
          </div>
          <div className=" grid col-start-5 col-end-6 items-center">
            <div className="grid text-xl font-bold justify-center">
              {fourDaysAfter[4].slice(0, 3)}
            </div>
            <img
              className="grid w-96  h-50 justify-center"
              src={dailyIcons[4]}
              alt="WeatherSitRepCloudyNight"
            />
            <div className="grid font-bold font-sans justify-center">
              {Math.round(dailyMinTemperature[4])}°C
            </div>
            <div className="grid text-gray-500 font-bold font-sans justify-center">
              {Math.round(dailyMaxTemperature[4])}°C
            </div>
          </div>
        </div>
      </div>
      <div className="grid justify-center">
        <Button
          className="flex items-center w-[300px] mt-5 mb-5 bg-iwgray600  font-bold"
          onClick={() => updateSearchSuccess(false)}
        >
          Search for another location
          <SearchIcon className="w-6 h-6 ml-2" />
        </Button>
      </div>
      <div className="grid justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="flex items-center w-[300px] mt-5 mb-5 bg-red-900  font-bold">
              Forget about me
              <XIcon className="w-6 h-6 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className=" bg-iwgray600">
            <DialogHeader>
              <DialogTitle className=" font-bold text-center">
                Forget about me
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className=" text-iwgray300 font-bold text-center">
              This action will clear all your previous searches.
            </DialogDescription>
            <div className="flex justify-end gap-2">
              <Button
                className="bg-red-900 font-bold"
                onClick={() => [
                  updateSearchSuccess(false),
                  clearLocalStorage(),
                  setOpen(false),
                ]}
              >
                Forget about me
              </Button>
              <Button
                className="bg-iwgray400 font-bold"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ResultPage;
