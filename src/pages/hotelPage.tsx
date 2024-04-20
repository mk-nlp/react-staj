import { getHotels } from "@/api/hotelApi";
import { useState, useEffect, useContext } from "react";
import { WeatherDetailContext } from "@/contexts/weatherDetailContext";
import { ErrorContext } from "@/contexts/errorContext";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleWarningIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SearchSuccessContext } from "@/contexts/searchContext";
import HotelComponent from "./restrauntPage";

export default function HotelPage() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const { cityName } = useContext(WeatherDetailContext);
  const { error, errorText, updateError, updateErrorText } =
    useContext(ErrorContext);
  const { updateRestaurantPage } =
    useContext(SearchSuccessContext);
  const [showButtons, setShowButtons] = useState(false);
  const [transition, setTransition] = useState("hidden");
  const animateUp = {
    hidden: { opacity: 0, y: "-100vh" }, // Transitions in the y-axis, bottom to top. Change vh to vw for left to right
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "-100vh" },
  };

  const UpTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 1,
  };

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 100) {
        // Change this value to control when the buttons should appear
        setShowButtons(true);
      } else {
        setShowButtons(false);
      }
    };

    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  useEffect(() => {
    error ? setTransition("visible") : setTransition("hidden");
  }, [error]);

  useEffect(() => {
    const parts = cityName.split(" - ");
    if (parts.length === 2) {
      const cityParts = parts[0].split(",");
      const cityPart = cityParts[0].trim();
      const countryPart = parts[1].trim();
      setCity(cityPart);
      setCountry(countryPart);
    }
  }, [cityName]);

  useEffect(() => {
    if (city && country) {
      getHotels(city, country).then((response) => {
        setHotels(response);
        if (response.elements.length === 0) {
          setTransition("visible");
          updateError(true);
          updateErrorText("No hotels found in the area.");
          setTimeout(() => {
            updateError(false);
          }, 3000);
          setTimeout(() => {
            updateErrorText("");
          }, 3500);
        } else if (response.error) {
          setTransition("visible");
          updateError(true);
          updateErrorText("Error fetching hotels.");
          setTimeout(() => {
            updateError(false);
          }, 3000);
          setTimeout(() => {
            updateErrorText("");
          }, 3500);
        }
      });
    }
  }, [city, country]);

  useEffect(() => {
    console.log("We got these hotels: ", hotels);
  }, [hotels]);

  return (
    <>
      <div className=" relative">
        <AnimatePresence mode="wait">
          <motion.div
            key="landingPage"
            initial="hidden"
            animate={transition}
            exit="exit"
            variants={animateUp}
            transition={UpTransition}
            className=" absolute top-10 left-0 w-full z-50"
          >
            <Alert
              variant={"destructive"}
              className=" bg-gray600 border border-gray500"
            >
              <AlertTitle className=" flex flex-row items-center font-bold, text-bluelight text-xl">
                <MessageCircleWarningIcon className="w-6 h-6 mr-2 mb-1 flex items-center justify-center " />
                Error!
              </AlertTitle>
              <AlertDescription className=" font-semibold, text-gray200">
                {errorText}
              </AlertDescription>
            </Alert>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-5">
        {hotels && (hotels as unknown as { elements: any[] }) ? (
          <div className="grid col-start-3 grid-cols-1">
            <div className="grid text-3xl items-center justify-center text-center font-bold">
              Hotels in {city} - {country}
              <div className=" text-sm">
                {((hotels as unknown) as { elements: any[] }).elements.length} hotels available
              </div>
              <div className=" text-xs">
                Data provided by OpenStreetMap subject to <a className="underline" href="https://www.openstreetmap.org/copyright">ODbl</a> license
              </div>
              <div className="text-xs text-red-800">
                Please note that the information provided here may not be up to date or accurate. Please verify on your own before making any plans.
              </div>
            </div>
            {((hotels as unknown) as { elements: any[] }).elements
              .filter((hotel) => hotel.tags && hotel.tags.name)
              .map((hotel) => {
                return (
                  <HotelComponent
                    key={hotel.id}
                    cityName={hotel.tags?.["addr:city"] || city}
                    cityDistrict={hotel.tags?.["addr:district"] || ""}
                    hotelName={hotel.tags.name}
                    hotelLatitude={hotel.lat}
                    hotelLongitude={hotel.lon}
                    hotelWebsite={hotel.tags?.website}
                  />
                );
              })}
          </div>
        ) : (
          <div className="grid col-start-3 grid-cols-1">
            <div className="grid text-2xl items-center justify-center text-center font-bold">
              Loading hotels in {cityName}
            </div>
          </div>
        )}
        {showButtons && (
          <>
            <Button
              className=" fixed bottom-20  right-5 grid  col-start-3 bg-gray400 text-gray200 mt-5 text-center"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to top
            </Button>
            <Button
              className=" fixed bottom-5  right-5 grid col-start-3 bg-gray400 text-gray200 mt-5 text-center"
              onClick={() => updateRestaurantPage(false)}
            >
              Back to weather details
            </Button>
          </>
        )}
        <Button onClick={() => updateRestaurantPage(false)} className="grid col-start-3 bg-gray600 text-gray200 mt-5 text-center">
            Back to weather details
            </Button>
      </div>
    </>
  );
}
