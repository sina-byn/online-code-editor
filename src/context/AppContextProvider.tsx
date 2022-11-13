import { FC, createContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from 'react';

// * interfaces
interface ProviderProps {
  children: ReactNode;
}

interface AppContext {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  liveMode: boolean;
  setLiveMode: Dispatch<SetStateAction<boolean>>;
  fullscreenElem: Element | null;
}

export const AppCtx = createContext<AppContext | null>(null);

const AppContextProvider: FC<ProviderProps> = ({ children }) => {
  const [fullscreenElem, setFullscreenElem] = useState<Element | null>(null);
  const [liveMode, setLiveMode] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('githubDark');

  const ctx = {
    theme,
    setTheme,
    liveMode,
    setLiveMode,
    fullscreenElem
  };

  useEffect(() => {
    const fullscreenHandler = () => setFullscreenElem(document.fullscreenElement);
    window.addEventListener('fullscreenchange', fullscreenHandler);

    return () => window.removeEventListener('fullscreenchange', fullscreenHandler);
  }, []);

  return <AppCtx.Provider value={ctx}>{children}</AppCtx.Provider>;
};

export default AppContextProvider;
