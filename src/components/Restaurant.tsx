import { useContext } from "react";

import { SearchSuccessContext } from "@/contexts/searchContext";
import { Button } from "@/components/ui/button";
import { HotelIcon } from "lucide-react";
export const RestaurantButton = () => {
    const { updateRestaurantPage } = useContext(SearchSuccessContext);
  
    return (
      <>
        <Button
          className="flex items-center w-[200px] mt-5 mb-5 bg-gray700  font-bold"
          onClick={() => updateRestaurantPage(true)}
        >
          Find a local hotel
          <HotelIcon className="w-6 h-6 ml-2" />
        </Button>
      </>
    );
  };