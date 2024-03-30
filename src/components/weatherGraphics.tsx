import { useState, useEffect } from "react";

export const WeatherGraphics = ({
  bgClass,
  cityName,
  day,
  thermalSensation,
  currentIcon,
  dailyMinTemperature,
  dailyMaxTemperature,
  weatherInterpretation,
}: {
  bgClass: string;
  cityName: string;
  day: string;
  thermalSensation: number;
  currentIcon: string;
  dailyMinTemperature: number[];
  dailyMaxTemperature: number[];
  weatherInterpretation: string;
}) => {
  return (
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
  );
};
