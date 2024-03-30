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

import { WeatherGraphics } from "@/components/weatherGraphics";
import { WeatherDetails } from "@/components/weatherDetails";
import { WeatherForecast } from "@/components/weatherForecast";

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
        <WeatherGraphics
          bgClass={bgClass}
          cityName={cityName}
          day={day}
          thermalSensation={thermalSensation}
          currentIcon={currentIcon}
          dailyMinTemperature={dailyMinTemperature}
          dailyMaxTemperature={dailyMaxTemperature}
          weatherInterpretation={weatherInterpretation}
        />

        <div className="grid  col-span-3 row-span-1 rounded-2xl grid-cols-12 p-4  grid-rows-0 bg-iwgray600 md:col-start-2">
          <WeatherDetails
            ThermalSensation={ThermalSensation}
            RainProb={RainProb}
            WindSpeed={WindSpeed}
            AirHumidity={AirHumidity}
            UVIndexIcon={UVIndexIcon}
            thermalSensation={thermalSensation}
            probabilityOfPrecipitation={probabilityOfPrecipitation}
            windSpeed={windSpeed}
            airHumidity={airHumidity}
            UVIndex={UVIndex}
          />
        </div>
        <div className="grid  col-span-3 rounded-2xl grid-cols-5 grid-rows-1 items-start bg-iwgray600 p-4 md:col-start-2">
          <WeatherForecast
            fourDaysAfter={fourDaysAfter}
            dailyIcons={dailyIcons}
            dailyMinTemperature={dailyMinTemperature}
            dailyMaxTemperature={dailyMaxTemperature}
          />
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
