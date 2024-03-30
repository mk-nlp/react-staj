export const WeatherForecast = ({
  fourDaysAfter,
  dailyIcons,
  dailyMinTemperature,
  dailyMaxTemperature,
}: {
  fourDaysAfter: string[];
  dailyIcons: string[];
  dailyMinTemperature: number[];
  dailyMaxTemperature: number[];
}) => {
  return (
    <>
      <div className=" grid col-start-1 col-end-2 items-center">
        <div className="grid text-xl font-bold justify-center items-center text-gray200">
          {fourDaysAfter[0].slice(0, 3)}
        </div>
        <img
          className="grid w-96 h-50 justify-center"
          src={dailyIcons[0]}
          alt="WeatherSitRepCloudyNight"
        />
        <div className="grid font-bold font-sans justify-center ">
          {Math.round(dailyMinTemperature[0])}°C
        </div>
        <div className="grid text-gray400 font-bold font-sans justify-center">
          {Math.round(dailyMaxTemperature[0])}°C
        </div>
      </div>
      <div className=" grid col-start-2 col-end-3 items-center">
        <div className="grid text-xl font-bold justify-center text-gray200">
          {fourDaysAfter[1].slice(0, 3)}
        </div>
        <img
          className="grid w-96  h-50 justify-center"
          src={dailyIcons[1]}
          alt="WeatherSitRepCloudyNight"
        />
        <div className="grid font-bold font-sans justify-center">
          {Math.round(dailyMinTemperature[1])}°c
        </div>
        <div className="grid text-gray400 font-bold font-sans justify-center">
          {Math.round(dailyMaxTemperature[1])}°c
        </div>
      </div>
      <div className=" grid col-start-3 col-end-4 items-center">
        <div className="grid text-xl font-bold justify-center text-gray200">
          {fourDaysAfter[2].slice(0, 3)}
        </div>
        <img
          className="grid w-96  h-50 justify-center"
          src={dailyIcons[2]}
          alt="WeatherSitRepCloudyNight"
        />
        <div className="grid font-bold font-sans justify-center">
          {Math.round(dailyMinTemperature[2])}°c
        </div>
        <div className="grid text-gray400 font-bold font-sans justify-center">
          {Math.round(dailyMaxTemperature[2])}°c
        </div>
      </div>
      <div className=" grid col-start-4 col-end-5 items-center">
        <div className="grid text-xl font-bold justify-center text-gray200">
          {fourDaysAfter[3].slice(0, 3)}
        </div>
        <img
          className="grid w-96  h-50 justify-center"
          src={dailyIcons[3]}
          alt="WeatherSitRepCloudyNight"
        />
        <div className="grid font-bold font-sans justify-center">
          {Math.round(dailyMinTemperature[3])}°c
        </div>
        <div className="grid text-gray400 font-bold font-sans justify-center">
          {Math.round(dailyMaxTemperature[3])}°c
        </div>
      </div>
      <div className=" grid col-start-5 col-end-6 items-center">
        <div className="grid text-xl font-bold justify-center text-gray200">
          {fourDaysAfter[4].slice(0, 3)}
        </div>
        <img
          className="grid w-96  h-50 justify-center"
          src={dailyIcons[4]}
          alt="WeatherSitRepCloudyNight"
        />
        <div className="grid font-bold font-sans justify-center">
          {Math.round(dailyMinTemperature[4])}°c
        </div>
        <div className="grid text-gray400 font-bold font-sans justify-center">
          {Math.round(dailyMaxTemperature[4])}°c
        </div>
      </div>
    </>
  );
};
