import React, { createContext, useState } from 'react';

export const SearchSuccessContext = createContext({
  searchSuccess: false,
  updateSearchSuccess: (value: boolean) => {},
});

export const SearchSuccessProvider = ({ children }) => {
  const [searchSuccess, setSearchSuccess] = useState(false);

  const updateSearchSuccess = (value: boolean) => {
    setSearchSuccess(value);
  };

  return (
    <SearchSuccessContext.Provider value={{ searchSuccess, updateSearchSuccess }}>
      {children}
    </SearchSuccessContext.Provider>
  );

}