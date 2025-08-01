"use client";
import { useUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs";
import { createContext, ReactNode, useContext } from "react";
interface AppContextType {
  user: User | null;
}
export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContet is undefined");
  }
  return context;
};

interface AppContextProviderProps {
  children: ReactNode;
}
export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const { user } = useUser();
  const value = {
    user,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
