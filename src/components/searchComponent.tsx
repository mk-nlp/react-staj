
import { ComboboxDemo } from './searchTest';


const SearchComponent = () => {


  return (
    <>
        <h1 className=' font-bold text-2xl'>Welcome to <span className='text-bluelight'>TypeWeather</span></h1>
        <p className=' text-xg text-gray-400 font-normal'>Choose a location to see the weather forecast</p>
        <div className='mt-6'>
          <ComboboxDemo />
        </div>
    </>
  );
}

export default SearchComponent;

