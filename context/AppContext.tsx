"use client";
import { useUser } from "@clerk/nextjs";
import { UserResource } from "@clerk/types";
import { createContext, ReactNode, useContext } from "react";
interface AppContextType {
  user: UserResource | null | undefined;
  isLoaded: boolean;
}

export const AppContext = createContext<AppContextType>({
  user: null,
  isLoaded: false,
});

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
  const { user, isLoaded } = useUser();
  const value = {
    user,
    isLoaded,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
