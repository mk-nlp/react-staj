import React, { createContext, useState } from 'react';

export const WeatherDetailContext = createContext({
  thermalSensation: 0,
  probabilityOfPrecipitation: 0,
  windSpeed: 0,
  airHumidity: 0,
  UVIndex: 0,
  dayStage: "",
  cityName: "",
  day: "",
  offsetSeconds: 0,
  weatherInterpretation: "",
  dailyInterpretation: [],
  dailyMinTemperature: [],
  dailyMaxTemperature: [],
});

export const WeatherDetailProvider = ({ children }) => {
  const [thermalSensation, setThermalSensation] = useState(0);
  const [probabilityOfPrecipitation, setProbabilityOfPrecipitation] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [airHumidity, setAirHumidity] = useState(0);
  const [UVIndex, setUVIndex] = useState(0);
  const [dayStage, setDayStage] = useState("");
  const [cityName, setCityName] = useState("");
  const [day, setDay] = useState("");
  const [offsetSeconds, setOffsetSeconds] = useState(0);
  const [weatherInterpretation, setWeatherInterpretation] = useState("");
  const [dailyInterpretation, setDailyInterpretation] = useState([]);
  const [dailyMinTemperature, setDailyMinTemperature] = useState([]);
  const [dailyMaxTemperature, setDailyMaxTemperature] = useState([]);

  
  const updateWeatherDetails = (data) => {
    setThermalSensation(data.thermalSensation);
    setProbabilityOfPrecipitation(data.probabilityOfPrecipitation);
    setWindSpeed(data.windSpeed);
    setAirHumidity(data.airHumidity);
    setUVIndex(data.UVIndex);
    setDayStage(data.dayStage);
    setCityName(data.cityName);
    setDay(data.day);
    setOffsetSeconds(data.offsetSeconds);
    setWeatherInterpretation(data.weatherInterpretation);
    setDailyInterpretation(data.dailyInterpretation);
    setDailyMinTemperature(data.dailyMinTemperature);
    setDailyMaxTemperature(data.dailyMaxTemperature);
  };


  return (
    <WeatherDetailContext.Provider value={{ thermalSensation, probabilityOfPrecipitation, windSpeed, airHumidity, UVIndex, dayStage, cityName, day, offsetSeconds, weatherInterpretation, dailyInterpretation, dailyMaxTemperature, dailyMinTemperature, updateWeatherDetails }}>
      {children}
    </WeatherDetailContext.Provider>
  );

}