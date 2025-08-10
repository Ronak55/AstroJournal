// src/context/SignContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { loadSign, saveSign } from '../services/signService';

/**
 * Context provider and hook for managing the user's selected zodiac sign.
 * Uses signStorage for persistence with safe fallbacks.
 */

interface SignContextType {
  sign: string;
  setSign: (sign: string) => Promise<void>;
  isLoading: boolean;
}

const SignContext = createContext<SignContextType | null>(null);

export const SignProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [sign, setSignState] = useState<string>(''); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const stored = await loadSign();
      if (isMounted) {
        setSignState(stored);
        setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const setSign = useCallback(async (newSign: string) => {
    setSignState(newSign);
    await saveSign(newSign);
  }, []);

  const value = useMemo(
    () => ({ sign, setSign, isLoading }),
    [sign, setSign, isLoading]
  );

  return (
    <SignContext.Provider value={value}>
      {children}
    </SignContext.Provider>
  );
};

export const useSign = (): SignContextType => {
  const context = useContext(SignContext);
  if (!context) {
    throw new Error('useSign must be used inside a SignProvider');
  }
  return context;
};
