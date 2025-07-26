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
    <div className="w-1/2 border-l pl-2">
      {/* navigation */}
      <div className="w-full h-[2.5rem] flex justify-around rounded-xl border py-1">
        <button
          className={`cursor-pointer w-40 rounded-lg hover:bg-[#F3F3F3] ${
            activePanel == "Chat" && "bg-[#F3F3F3]"
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
          className={`cursor-pointer hover:bg-[#F3F3F3] w-40 rounded-lg ${
            activePanel == "Summary" && "bg-[#F3F3F3]"
          }`}
          onClick={handleClick}
        >
          <div className="flex justify-center gap-2 items-center">
            <CgNotes />
            Summary
          </div>
        </button>
        <button
          className={`cursor-pointer hover:bg-[#F3F3F3] w-40 rounded-lg ${
            activePanel == "Notes" && "bg-[#F3F3F3]"
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
