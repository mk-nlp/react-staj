import BrandComponent from "@/components/brandComponent";
import SearchComponent from "@/components/searchComponent";
import CurveLine, { FlippedCurveLine } from "../components/curve";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useContext, useEffect } from "react";
import { ErrorContext } from "@/contexts/errorContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircleWarningIcon } from "lucide-react";

const LandingPage = () => {
  const { error, errorText } = useContext(ErrorContext);
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
    error ? setTransition("visible") : setTransition("hidden");
  }, [error]);

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
      <div className=" grid justify-items-center bg-background mt-9">
        <BrandComponent />
      </div>
      <div className="grid justify-items-center w-full">
        <CurveLine />
      </div>
      <div className="grid justify-items-center bg-background mt-64">
        <SearchComponent />
      </div>
      <div className="grid justify-items-center mt-22">
        <FlippedCurveLine />
      </div>
    </>
  );
};

export default LandingPage;
