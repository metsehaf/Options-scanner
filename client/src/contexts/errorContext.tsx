
import React, { createContext, useState, useContext, ReactNode, FC, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
 
export interface ErrorContextType {
  showError: (message: string) => void;
}
 
export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);
 
export const ErrorProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [errors, setErrors] = useState<string[]>([]);
 
  const showError = useCallback((message: string) => {
    setTimeout(() => {
      setErrors((prevErrors) => [...prevErrors, message]);
    }, 0);
  }, []);
 
  const handleClose = (index: number) => () => {
    setErrors((prevErrors) => prevErrors.filter((_, i) => i !== index));
  };
 
  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {errors.map((error, index) => (
        <Snackbar
          key={index}
          open
          autoHideDuration={6000}
          onClose={handleClose(index)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ mt: `${64 + index * 60}px` }}
        >
          <MuiAlert onClose={handleClose(index)} severity="error" sx={{ width: '100%' }}>
            {error}
          </MuiAlert>
        </Snackbar>
      ))}
    </ErrorContext.Provider>
  );
};
 
export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};
 