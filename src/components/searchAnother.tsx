import { useContext } from "react";

import { SearchSuccessContext } from "@/contexts/searchContext";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export const SearchAnotherButton = () => {
  const { updateSearchSuccess } = useContext(SearchSuccessContext);

  return (
    <>
      <Button
        className="flex items-center w-[300px] mt-5 mb-5 bg-iwgray600  font-bold"
        onClick={() => updateSearchSuccess(false)}
      >
        Search for another location
        <SearchIcon className="w-6 h-6 ml-2" />
      </Button>
    </>
  );
};
