import React, { createContext, useState, useEffect } from "react";

export const PreviousCitiesContext = createContext({
  previousCities: [],
  addCity: (_city: any) => {},
  removeCity: (_city: any) => {},
  clearLocalStorage: () => {},
});

export const PreviousCitiesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [previousCities, setPreviousCities] = useState(() => {
    const localData = localStorage.getItem("previousCities");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("previousCities", JSON.stringify(previousCities));
  }, [previousCities]);

  const addCity = (city: any) => {
    if (!previousCities.includes(city)) {
      setPreviousCities([...previousCities, city]);
    }
  };

  const removeCity = (city: any) => {
    setPreviousCities(previousCities.filter((item: any) => item !== city));
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("previousCities");
    setPreviousCities([]);
  };

  return (
    <PreviousCitiesContext.Provider
      value={{ previousCities, addCity, removeCity, clearLocalStorage }}
    >
      {children}
    </PreviousCitiesContext.Provider>
  );
};

export default PreviousCitiesContext;
