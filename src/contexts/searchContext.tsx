import React, { createContext, useState } from "react";

export const SearchSuccessContext = createContext({
  searchSuccess: false,
  restaurantPage: false,
  hotelPage: false,
  updateSearchSuccess: (_value: boolean) => {},
  updateRestaurantPage: (_value: boolean) => {},
  updateHotelPage: (_value: boolean) => {},
});

export const SearchSuccessProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [restaurantPage, setRestaurantPage] = useState(false);
  const [hotelPage, setHotelPage] = useState(false);

  const updateSearchSuccess = (value: boolean) => {
    setSearchSuccess(value);
  };

  const updateRestaurantPage = (value: boolean) => {
    setRestaurantPage(value);
  };

  const updateHotelPage = (value: boolean) => {
    setHotelPage(value);
  };

  return (
    <SearchSuccessContext.Provider
      value={{ searchSuccess, updateSearchSuccess, restaurantPage, updateRestaurantPage, hotelPage, updateHotelPage}}
    >
      {children}
    </SearchSuccessContext.Provider>
  );
};
