import { createContext, useState } from 'react';

export const ErrorContext = createContext({
  error: "",
  updateError: (value: string) => {},
});

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState("");

  const updateError = (value: string) => {
    setError(value);
  };

  return (
    <ErrorContext.Provider value={{ error, updateError }}>
      {children}
    </ErrorContext.Provider>
  );

}

export default ErrorContext;
