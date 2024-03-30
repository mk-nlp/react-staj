import { createContext, useState } from "react";
import { ReactNode } from "react";

export const ErrorContext = createContext({
  error: false,
  errorText: "",
  updateError: (_value: boolean) => {},
  updateErrorText: (_value: string) => {},
});

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const updateError = (value: boolean) => {
    setError(value);
  };

  const updateErrorText = (value: string) => {
    setErrorText(value);
  };

  return (
    <ErrorContext.Provider
      value={{ error, errorText, updateError, updateErrorText }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
