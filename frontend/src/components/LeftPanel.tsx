import { useState } from "react";
import { GoBook } from "react-icons/go";
import { RxText } from "react-icons/rx";
import { IoChevronUp } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
// import { useGlobalContext } from "@/context/GlobalContext";

function LeftPanel() {
  const [activePanel, setActivePanel] = useState<string>("Chapters");
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  

  const handleFullScreen = () => {
    setFullScreen((prev) => !prev);
  };

  return (
    <div className="w-1/2 flex flex-col gap-2">
      {!fullScreen && (
        <div className="h-[28rem] shrink-0">{/* embedded video */}</div>
      )}

      {/* Transcripts and chapters container */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Navigation */}
        <div className="flex gap-5">
          <div className="flex w-72 justify-around rounded-2xl border h-11 items-center">
            <button onClick={(e) => setActivePanel(e.currentTarget.innerText)}>
              <div
                className={`flex cursor-pointer hover:bg-[#F3F3F3] py-1 px-5 rounded-lg items-center gap-2 ${
                  activePanel == "Chapters" && "bg-[#F3F3F3]"
                }`}
              >
                <GoBook />
                <p>Chapters</p>
              </div>
            </button>
            <button onClick={(e) => setActivePanel(e.currentTarget.innerText)}>
              <div
                className={`flex cursor-pointer hover:bg-[#F3F3F3] py-1 px-5 rounded-lg items-center gap-2 ${
                  activePanel == "Transcripts" && "bg-[#F3F3F3]"
                }`}
              >
                <RxText />
                <p>Transcripts</p>
              </div>
            </button>
          </div>
          <div
            className="flex justify-center items-center px-4 rounded-2xl my-1 cursor-pointer border hover:bg-[#F3F3F3]"
            onClick={handleFullScreen}
          >
            {fullScreen ? <IoChevronDown /> : <IoChevronUp />}
          </div>
        </div>

        {/* Trancripts and chapters */}
        <div className="flex-1 overflow-y-auto">
          {activePanel === "Chapters" ? <Chapters /> : <Transcripts />}
        </div>

      </div>
    </div>
  );
}

function Chapters() {
  return (
    <div className="p-4">
      Chapters will go here.
    </div>
  );
}

function Transcripts() {
  // const { selectedVideo } = useGlobalContext();
  return (
    <div className="p-4">
      Transcripts will go here.
    </div>
  );
}

export default LeftPanel;
