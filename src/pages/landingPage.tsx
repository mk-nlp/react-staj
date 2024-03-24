import BrandComponent from "@/components/brandComponent";
import { ComboboxDemo } from "@/components/searchTest";
import SearchComponent from "@/components/searchComponent";
import Curve from "@/components/curve";
const LandingPage = () => {
  return (
    <>
      <div className=" grid justify-items-center bg-gray-900 mt-9">
        <BrandComponent/>
      </div>
      <div className="grid justify-items-center">
        <Curve flipped={false}/>
      </div>
      <div className="grid justify-items-center bg-gray-900 mt-60">
        <SearchComponent/>
      </div>
      <div className="grid justify-items-center mt-32">
        <Curve flipped={true}/>
      </div>
    </>
  );
};

export default LandingPage;
