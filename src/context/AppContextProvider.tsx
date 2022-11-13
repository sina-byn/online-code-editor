import { FC, createContext, ReactNode } from 'react';

// * interfaces
interface ProviderProps {
    children: ReactNode;
}

interface AppContext {
    [key: string]: any;
};

export const AppCtx: AppContext = createContext({});

const AppContextProvider: FC<ProviderProps> = ({ children }) => {
    return (
        <AppCtx.Provider value={null}>
            {children}
        </AppCtx.Provider>
    );
};

export default AppContextProvider;