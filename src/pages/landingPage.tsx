import BrandComponent from "@/components/brandComponent";
import { ComboboxDemo } from "@/components/searchTest";
import SearchComponent from "@/components/searchComponent";
import CurveLine, { FlippedCurveLine } from '../components/curve';

const LandingPage = () => {
  return (
    <>
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
