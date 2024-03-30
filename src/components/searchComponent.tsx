import { SearchPopOver } from "./searchInput";

const SearchComponent = () => {
  return (
    <>
      <h1 className=" font-bold text-2xl text-gray100">
        Welcome to <span className="text-bluelight">TypeWeather</span>
      </h1>
      <p className=" text-xg text-gray200 font-normal">
        Choose a location to see the weather forecast
      </p>
      <div className="mt-6">
        <SearchPopOver />
      </div>
    </>
  );
};

export default SearchComponent;
