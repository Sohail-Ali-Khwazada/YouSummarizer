import { useRef, useState } from "react";
import { GoBook } from "react-icons/go";
import { RxText } from "react-icons/rx";
import { useGlobalContext } from "@/context/GlobalContext";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";
import YouTube, {
  type YouTubeProps,
  type YouTubeEvent,
  type YouTubePlayer,
} from "react-youtube";
import TranscriptsChapters from "./TranscriptsChapters";

function LeftPanel() {
  const { selectedVideo } = useGlobalContext();
  const videoId = selectedVideo?.video_url.split("v=")[1];
  const [activePanel, setActivePanel] = useState<string>("Chapters");
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [autoScroll, setAutoScroll] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleFullScreen = () => {
    setFullScreen((prev) => !prev);
  };

  const onPlayerReady: YouTubeProps["onReady"] = (e: YouTubeEvent) => {
    playerRef.current = e.target;
  };

  const onPlayerStateChange: YouTubeProps["onStateChange"] = (e) => {
    if (e.data === 1) {
      intervalRef.current = setInterval(() => {
        const time = playerRef.current?.getCurrentTime();
        if (time !== undefined) setCurrentTime(time);
      }, 2000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  const handleSeek = (time: number) => {
    playerRef.current?.seekTo(time, true);
  };

  return (
    <div className="w-1/2 flex flex-col gap-2">
      {/* video player */}
      <div className={`h-[28rem] shrink-0 ${fullScreen ? "hidden" : ""}`}>
        <YouTube
          videoId={videoId}
          className="h-full w-full pr-4"
          iframeClassName="w-full h-full rounded-2xl"
          opts={{
            playerVars: {
              autoplay: 0,
            },
          }}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
      </div>

      {/* Transcripts and chapters container */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Navigation */}
        <div className="flex gap-5">
          {/* chapter and transcript buttons */}
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
          {/* fullScreen     */}
          <div
            className="flex justify-center items-center px-4 rounded-2xl my-1 cursor-pointer border hover:bg-[#F3F3F3]"
            onClick={handleFullScreen}
          >
            {fullScreen ? <IoChevronDown /> : <IoChevronUp />}
          </div>

          {/* autoscroll button */}
          <button
            onClick={() => setAutoScroll((prev) => !prev)}
            className="ml-auto mr-3 border rounded-3xl px-1"
          >
            <div
              className={`flex items-center gap-4 hover:bg-[#F3F3F3] py-1 px-4 rounded-2xl cursor-pointer ${
                autoScroll && "bg-[#F3F3F3]"
              }`}
            >
              <div className="flex flex-col">
                <IoChevronUp size={12} />
                <IoChevronDown size={12} />
              </div>
              <p>Auto Scroll</p>
            </div>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <TranscriptsChapters
           activePanel= {activePanel}
           handleSeek={handleSeek}
           currentTime={currentTime}
           autoScroll={autoScroll}
          />
        </div>
      </div>
    </div>
  );
}





export default LeftPanel;
