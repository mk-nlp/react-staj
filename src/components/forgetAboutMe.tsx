import { useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { SearchSuccessContext } from "@/contexts/searchContext";
import { PreviousCitiesContext } from "@/contexts/previousCitiesContext";

export const ForgetAboutMe = () => {
  const [open, setOpen] = useState(false);
  const { updateSearchSuccess } = useContext(SearchSuccessContext);
  const { clearLocalStorage } = useContext(PreviousCitiesContext);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center w-[300px] mt-5 mb-5 bg-red-900  font-bold">
          Forget about me
          <XIcon className="w-6 h-6 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className=" bg-gray600 border-gray600">
        <DialogHeader>
          <DialogTitle className=" font-bold text-center">
            Forget about me
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className=" text-iwgray300 font-bold text-center">
          This action will clear all your previous searches.
        </DialogDescription>
        <div className="flex justify-end gap-2">
          <Button
            className="bg-red-900 font-bold"
            onClick={() => [
              updateSearchSuccess(false),
              clearLocalStorage(),
              setOpen(false),
            ]}
          >
            Forget about me
          </Button>
          <Button
            className="bg-gray400 font-bold"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
