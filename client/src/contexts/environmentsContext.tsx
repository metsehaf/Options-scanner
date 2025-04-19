import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
 
 
interface EnvironmentsContextProps {
  environments: Environments;
  loading: boolean;
}
 
interface Environments {
  [key: string]: string;
}
 
interface EnvironmentsProviderProps {
  children: ReactNode;
}
 
const EnvironmentsContext = createContext<EnvironmentsContextProps | undefined>(undefined);
 
const EnvironmentsProvider = ({ children }: EnvironmentsProviderProps) => {
  const [environments, setEnvironments] = useState<Environments>({});
  const [loading, setLoading] = useState<boolean>(true);
 
 
  useEffect(() => {
    const fetchEnvironments = async () => {
      try {
        const response = await fetch('api/envs');
        const data: Environments = await response.json();
        setEnvironments(data);
      } catch (error) {
        console.error('Error fetching environments:', error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchEnvironments();
  }, []);
 
  return (
    <EnvironmentsContext.Provider value={{ environments, loading }}>
      {children}
    </EnvironmentsContext.Provider>
  );
};
 
const useEnvironments = () => {
  const context = useContext(EnvironmentsContext);
  if (context === undefined) {
    throw new Error('useEnvironments must be used within a EnvironmentsProvider');
  }
  return context;
};
 
export { EnvironmentsProvider, useEnvironments };