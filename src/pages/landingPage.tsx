import BrandComponent from "@/components/brandComponent";
import SearchComponent from "@/components/searchComponent";
import CurveLine, { FlippedCurveLine } from '../components/curve';
import {  Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useContext } from "react";
import { ErrorContext } from "@/contexts/errorContext";


const LandingPage = () => {
  const { error } = useContext(ErrorContext);

  return (
    <>
      {error && (
        <Alert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className=" grid justify-items-center bg-background mt-9">
        <BrandComponent/>
      </div>
      <div className="grid justify-items-center">
        <CurveLine/>
      </div>
      <div className="grid justify-items-center bg-background mt-64">
        <SearchComponent/>
      </div>
      <div className="grid justify-items-center mt-22">
        <FlippedCurveLine/>
      </div>
    </>
  );
};

export default LandingPage;
