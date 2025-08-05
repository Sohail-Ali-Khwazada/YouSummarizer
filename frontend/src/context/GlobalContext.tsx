import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthUser {
  _id: string;
  username?: string;
  googleId?: string;
  fullname?: string;
  email?: string;
  profilePic?: string;
  token: string;
}

interface chat {
  sender: "user" | "bot";
  message: string;
  timestamp: Date;
}
interface transcript_segments {
  _id: string;
  timestamp: string;
  text: string;
}
export interface chapter_segments {
  title: string;
  startTime: string;
  description: string;
}

export interface video {
  _id: string;
  video_url: string;
  title: string;
  summary: string;
  transcript: transcript_segments[];
  chapter: chapter_segments[];
}


interface message {
  from: string;
  text: string;
}

interface GlobalContextType {
  authUser: AuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  selectedVideo: video | null;
  setSelectedVideo: React.Dispatch<React.SetStateAction<video | null>>;
  chatMessages: message[];
  setChatMessages: React.Dispatch<React.SetStateAction<message[]>>;
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
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
  const [chatMessages, setChatMessages] = useState<message[]>([]);
  const [note, setNote] = useState<string>("");

  return <GlobalContext.Provider value={{authUser,setAuthUser,selectedVideo,setSelectedVideo,chatMessages,setChatMessages,note,setNote}}>
    {children}
  </GlobalContext.Provider>
}