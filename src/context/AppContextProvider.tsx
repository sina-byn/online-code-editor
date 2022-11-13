import { FC, createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

// * interfaces
interface ProviderProps {
  children: ReactNode;
}

interface AppContext {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

export const AppCtx = createContext<AppContext | null>(null);

const AppContextProvider: FC<ProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>('githubDark');

  const ctx = {
    theme,
    setTheme,
  };

  return <AppCtx.Provider value={ctx}>{children}</AppCtx.Provider>;
};

export default AppContextProvider;
