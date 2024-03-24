import iWeatherSvg from "../assets/branding/Tipo=Marca.svg";

const BrandComponent = () => {
  return (
    <div>
      <h1 className="2xl">iWeather</h1>
      <img src={iWeatherSvg} alt="iWeather Logo" />
    </div>
  );
};

export default BrandComponent;
