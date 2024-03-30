import { createContext, useState } from "react";

export const ErrorContext = createContext({
  error: "",
  updateError: (_value: string) => {},
});

import { ReactNode } from "react";

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState("");

  const updateError = (value: string) => {
    setError(value);
  };

  return (
    <ErrorContext.Provider value={{ error, updateError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
