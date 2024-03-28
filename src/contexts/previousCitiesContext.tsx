import React, { createContext, useState, useEffect } from 'react';

export const PreviousCitiesContext = createContext({
  previousCities: [],
  addCity: (city) => {},
  removeCity: (city) => {},
  clearLocalStorage: () => {},
});

export const PreviousCitiesProvider = ({ children }) => {
  const [previousCities, setPreviousCities] = useState(() => {
    const localData = localStorage.getItem('previousCities');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('previousCities', JSON.stringify(previousCities));
  }, [previousCities]);

  const addCity = (city) => {
    if (!previousCities.includes(city)) {
      setPreviousCities([...previousCities, city]);
    }
  };

  const removeCity = (city) => {
    setPreviousCities(previousCities.filter((item) => item !== city));
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('previousCities');
    setPreviousCities([]);
  }

  return (
    <PreviousCitiesContext.Provider value={{ previousCities, addCity, removeCity, clearLocalStorage}}>
      {children}
    </PreviousCitiesContext.Provider>
  );
};

export default PreviousCitiesContext;