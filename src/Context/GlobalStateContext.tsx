import React, { createContext, useContext, useState } from 'react';
interface Settings {
        id: number;
        websiteLogo: string | null;
        contactNumber: string | null;
        businessEmail: string | null;
        fbLink: string | null;
        twitterLink: string | null;
        instaLink: string | null;
        razorpayApiKey: string | null;
        razorpayApiSecret: string | null;
        sms99ApiKey: string | null;
        courierServiceApi: string | null;
      
    // Add other settings properties here
  }
  
  interface GlobalStateContextType {
    settings: Settings | null;
    setSettings: (settings: Settings) => void;
  }
  
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings | null>(null);

  return (
    <GlobalStateContext.Provider value={{ settings, setSettings }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
