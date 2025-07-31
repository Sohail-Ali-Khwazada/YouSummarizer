import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthUser {
  _id: string;
  username: string;
  token: string;
}
interface transcript_segments {
  _id: string;
  timestamp: string;
  text: string;
}
interface chat {
  sender: "user" | "bot";
  message: string;
  timestamp: Date;
}
interface video {
  video_url: string;
  title: string;
  summary: string;
  transcript: transcript_segments[];
  notes: string;
  chatHistory: chat[]
}

interface GlobalContextType {
  authUser: AuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  selectedVideo: video | null;
  setSelectedVideo: React.Dispatch<React.SetStateAction<video | null>>;
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
  const [selectedVideo, setSelectedVideo] = useState<video | null>(null);

  return <GlobalContext.Provider value={{authUser,setAuthUser,selectedVideo,setSelectedVideo}}>
    {children}
  </GlobalContext.Provider>
}