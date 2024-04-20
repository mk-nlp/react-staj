import { useContext } from "react";

import { SearchSuccessContext } from "@/contexts/searchContext";
import { Button } from "@/components/ui/button";
import { Utensils } from "lucide-react";

export const HotelButton = () => {
    const { updateHotelPage } = useContext(SearchSuccessContext);
  
    return (
      <>
        <Button
          className="flex items-center w-[200px] mt-5 mb-5 bg-gray700  font-bold"
          onClick={() => updateHotelPage(true)}
        >
          Find a local restaurant
          <Utensils className="w-6 h-6 ml-2" />
        </Button>
      </>
    );
  };