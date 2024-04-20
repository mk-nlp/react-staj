import "./App.css";
import LandingPage from "./pages/landingPage";
import ResultPage from "./pages/resultPage";
import {
  SearchSuccessProvider,
  SearchSuccessContext,
} from "./contexts/searchContext";
import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WeatherDetailProvider } from "./contexts/weatherDetailContext";
import { ErrorProvider } from "./contexts/errorContext";
import { PreviousCitiesProvider } from "./contexts/previousCitiesContext";
import VallaPage from "./pages/vallaPage";
import RealRestrauntPage from "./pages/realRestrauntPage";

// Animation for the page transition
const animateUp = {
  hidden: { opacity: 0, y: "100vh" }, // Transitions in the y-axis, bottom to top. Change vh to vw for left to right
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "-100vh" },
};

const UpTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 2,
};

function Content() {
  const { searchSuccess, restaurantPage, hotelPage } = useContext(SearchSuccessContext);
  const [transition, setTransition] = useState("hidden");

  // Here, we are reserving time for the result page to load before transitioning
  // to the result page. This is to prevent the result page from appearing in a laggy way.
  // Timeouts below 1500 make it laggy and ruin the transition effect.
  function smoothTransition() {
    setTimeout(() => {
      setTransition("visible");
    }, 0);
  }

  // This useEffect hook is for transitioning to the result page
  // when the search is successful.
  // I use the searchSuccess state here as a dependency to trigger the transition.
  useEffect(() => {
    searchSuccess || restaurantPage || hotelPage ? smoothTransition() : setTransition("hidden");
  }, [searchSuccess]);

  return (
    <AnimatePresence mode="wait">
      {!searchSuccess && (
        <motion.div
          key="landingPage"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animateUp}
          transition={UpTransition}
        >
          <LandingPage />
        </motion.div>
      )}
      {searchSuccess && !restaurantPage && !hotelPage &&(
        <motion.div
          key="resultPage"
          initial="hidden"
          animate={transition}
          exit="exit"
          variants={animateUp}
          transition={UpTransition}
        >
          <ResultPage />
        </motion.div>
      )}
      {restaurantPage && (
        <motion.div
          key="restaurantPage"
          initial="hidden"
          animate={transition}
          exit="exit"
          variants={animateUp}
          transition={UpTransition}
        >
          <VallaPage/>
        </motion.div>
      )}
      {hotelPage && (
        <motion.div
          key="hotelPage"
          initial="hidden"
          animate={transition}
          exit="exit"
          variants={animateUp}
          transition={UpTransition}
        >
          <RealRestrauntPage/>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <PreviousCitiesProvider>
      <ErrorProvider>
        <WeatherDetailProvider>
          <SearchSuccessProvider>
            <Content />
          </SearchSuccessProvider>
        </WeatherDetailProvider>
      </ErrorProvider>
    </PreviousCitiesProvider>
  );
}

export default App;
