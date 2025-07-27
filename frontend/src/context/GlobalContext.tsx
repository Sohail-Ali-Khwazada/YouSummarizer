import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthUser {
  _id: string;
  username: string;
  token: string;
}

interface GlobalContextType {
  authUser: AuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}


export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if(!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
}

export const GlobalContextProvider = ({children} : {children:ReactNode}) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(JSON.parse(localStorage.getItem("you-user") || "null"));
  return <GlobalContext.Provider value={{authUser,setAuthUser}}>
    {children}
  </GlobalContext.Provider>
}