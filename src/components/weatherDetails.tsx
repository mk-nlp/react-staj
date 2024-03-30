import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

export const WeatherDetails = ({
  thermalSensation,
  ThermalSensationIcon,
  RainProbIcon,
  probabilityOfPrecipitation,
  WindSpeedIcon,
  windSpeed,
  airHumidity,
  AirHumidityIcon,
  UVIndexIcon,
  UVIndex,
}: {
  thermalSensation: number;
  ThermalSensationIcon: string;
  RainProbIcon: string;
  probabilityOfPrecipitation: number;
  WindSpeedIcon: string;
  windSpeed: number;
  airHumidity: number;
  AirHumidityIcon: string;
  UVIndexIcon: string;
  UVIndex: number;
}) => {
  return (
    <>
      <div className=" grid  col-start-1 col-end-1 items-center justify-start">
        <img className=" w-6" src={ThermalSensationIcon} alt="UV Index" />
      </div>
      <div className="  grid col-start-2 col-end-7 items-center justify-start text-iwgray200 font-bold ">
        Thermal Sensation
      </div>
      <div className=" grid col-start-7 col-end-13 items-center justify-end text-xl font-bold">
        {thermalSensation}°C
      </div>
      <Separator className="grid col-span-12 m-0 p-0 bg-gray-800" />

      <div className="grid col-start-1 cold-end-2 items-center justify-start">
        <img className=" w-6" src={RainProbIcon} alt="Rain Probability" />
      </div>
      <div className=" grid col-start-2 col-end-7 items-center justify-start text-iwgray200 font-bold">
        Rain Probability
      </div>
      <div className=" grid col-start-7 col-end-13 items-center justify-end text-xl font-bold">
        {probabilityOfPrecipitation}%
      </div>
      <Separator className="grid col-span-12 m-0 p-0 bg-gray-800" />

      <div className="grid col-start-1 cold-end-2 items-center justify-start">
        <img className=" w-6" src={WindSpeedIcon} alt="Wind Speed" />
      </div>
      <div className=" grid col-start-2 col-end-7 items-center justify-start text-iwgray200  font-bold">
        Wind Speed
      </div>
      <div className=" grid col-start-7 col-end-13 items-center justify-end text-xl font-bold">
        {windSpeed}km/h
      </div>
      <Separator className="grid col-span-12 m-0 p-0 bg-gray-800" />

      <div className="grid col-start-1 cold-end-2 items-center justify-start">
        <img className=" w-6" src={AirHumidityIcon} alt="Air Humidity" />
      </div>
      <div className=" grid col-start-2 col-end-7 items-center justify-start text-iwgray200  font-bold">
        Air Humidity
      </div>
      <div className=" grid col-start-7 col-end-13 items-center justify-end text-xl font-bold">
        {airHumidity}%
      </div>
      <Separator className="grid col-span-12 m-0 p-0  bg-gray-800" />

      <div className="grid col-start-1 cold-end-2 items-center justify-start">
        <img className=" w-6" src={UVIndexIcon} alt="UV Index" />
      </div>
      <div className=" grid col-start-2 col-end-7 items-center justify-start text-iwgray200   font-bold">
        UV Index
      </div>
      <div className=" grid col-start-7 col-end-13 items-center justify-end text-xl font-bold">
        {UVIndex}%
      </div>
    </>
  );
};
