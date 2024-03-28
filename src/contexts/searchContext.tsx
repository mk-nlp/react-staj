import React, { createContext, useState } from 'react';

export const SearchSuccessContext = createContext({
  searchSuccess: false,
  updateSearchSuccess: (_value: boolean) => {},
});

export const SearchSuccessProvider = ({ children }: { children: React.ReactNode }) => {
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