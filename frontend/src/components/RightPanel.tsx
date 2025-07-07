import { useState } from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { GrNotes } from "react-icons/gr";
import ChatScreen from "./ChatScreen";
import SummaryScreen from "./SummaryScreen";
import NotesScreen from "./NotesScreen";

function RightPanel() {
  const [activePanel, setActivePanel] = useState<string>("Chat");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActivePanel(e.currentTarget.innerText);
  };

  return (
    <div className="w-1/2">
      {/* navigation */}
      <div className="bg-[#222222] w-full h-[3rem] flex justify-around rounded-xl text-gray-300 py-2">
        <button
          className={`cursor-pointer hover:text-white w-40 rounded-lg  ${
            activePanel == "Chat" && "bg-[#171717] text-white"
          }`}
          onClick={handleClick}
        >
          <div className="flex justify-center gap-2 items-center">
            <span>
              <IoChatbubbleOutline />
            </span>
            <span>Chat</span>
          </div>
        </button>
        <button
          className={`cursor-pointer hover:text-white w-40 rounded-lg ${
            activePanel == "Summary" && "bg-[#171717] text-white"
          }`}
          onClick={handleClick}
        >
          <div className="flex justify-center gap-2 items-center">
            <CgNotes />
            Summary
          </div>
        </button>
        <button
          className={`cursor-pointer hover:text-white w-40 rounded-lg ${
            activePanel == "Notes" && "bg-[#171717] text-white"
          }`}
          onClick={handleClick}
        >
          <div className="flex justify-center gap-2 items-center">
            <GrNotes />
            Notes
          </div>
        </button>
      </div>

      {activePanel == "Chat" && <ChatScreen />}
      {activePanel == "Summary" && <SummaryScreen />}
      {activePanel == "Notes" && <NotesScreen />}

    </div>
  );
}

export default RightPanel;
