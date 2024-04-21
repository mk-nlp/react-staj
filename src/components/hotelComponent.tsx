
import { HotelIcon } from "lucide-react"

export default function HotelComponent ({
    cityName,
    cityDistrict,
    hotelName,
    hotelLatitude,
    hotelLongitude,
    hotelWebsite,
  }: {
    cityName: string;
    cityDistrict: string;
    hotelLatitude: number;
    hotelName: string;
    hotelLongitude: number;
    hotelWebsite: string;
  }){
    return (
        <div
        className={`bg-gray600 bg-center grid col-span-2 p-2 rounded-3xl border-gray800 border-[10px]`}
      >
        <div className="grid grid-cols-1 grid-rows-2 p-2">
          <div className="grid col-start-1 col-end-4">
            <div className=" font-sans font-bold">{cityName}</div>
            <div className=" font-sans">{cityDistrict}</div>
          </div>
          <div className="grid row-start-3 row-end-4">
            <div className="grid grid-cols-2 justify-center items-center">
              <HotelIcon className=""/>
              <div className="text-2xl font-extrabold">{hotelName}</div>
            </div>
          </div>
          <div className="grid grid-rows-1 col-start-1 row-start-4 row-end-5">
            <div className="grid text-xl font-sans font-bold items-end hover:text-gray400">
              <a href={`http://maps.google.com/maps?q=loc:${hotelLatitude},${hotelLongitude}&z=17'`}> Directions</a>

            </div>
            <div className="font-sans text-xm hover:text-gray400 ">
                <a href={hotelWebsite} target="_blank" rel="noreferrer">Hotel website</a>
            </div>
          </div>
        </div>
      </div>
    )
}

