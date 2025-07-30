import { useEffect, useRef, useState } from "react";
import { GoBook } from "react-icons/go";
import { RxText } from "react-icons/rx";
import { useGlobalContext } from "@/context/GlobalContext";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";
import YouTube, {
  type YouTubeProps,
  type YouTubeEvent,
  type YouTubePlayer,
} from "react-youtube";

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

        {/* Trancripts and chapters */}
        <div className="flex-1 overflow-y-auto">
          {activePanel === "Chapters" ? (
            <Chapters />
          ) : (
            <Transcripts
              handleSeek={handleSeek}
              currentTime={currentTime}
              autoScroll={autoScroll}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Chapters() {
  return <div className="p-4">Chapters will go here.</div>;
}

function Transcripts({
  handleSeek,
  currentTime,
  autoScroll,
}: {
  handleSeek: (time: number) => void;
  currentTime: number;
  autoScroll: boolean;
}) {
  const { selectedVideo } = useGlobalContext();
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const convertIntoSecs = (timeText: string): number => {
    const parts = timeText.split(":").map(Number);
    let time = 0;
    if (parts.length === 3) {
      const [hour, min, sec] = parts;
      time = hour * 3600 + min * 60 + sec;
    } else if (parts.length === 2) {
      const [min, sec] = parts;
      time = min * 60 + sec;
    }
    return time;
  };

  const formatForDisplay = (timeText: string) => {
    const [hour, min, sec] = timeText.split(":").map(Number);
    const padded = (n: number) => n.toString().padStart(2, "0");

    if (hour === 0) {
      return `${padded(min)}:${padded(sec)}`;
    }
    return timeText;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const timestampText = e.currentTarget.children[0]?.textContent;
    console.log(timestampText);

    if (timestampText) {
      const time = convertIntoSecs(timestampText);
      handleSeek(time);
    }
  };

  useEffect(() => {
    if (!selectedVideo || !autoScroll) return;

    const activeIndex = selectedVideo.transcript.findIndex((el, i) => {
      const current = convertIntoSecs(el.timestamp);
      const next = convertIntoSecs(
        selectedVideo.transcript[i + 1]?.timestamp || "99:59:59"
      );
      return currentTime >= current && currentTime < next;
    });

    if (activeIndex !== -1 && refs.current[activeIndex]) {
      refs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentTime]);

  return (
    <div className="p-4 space-y-4">
      {selectedVideo?.transcript.map((el, index) => (
        <div
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          className="rounded-xl p-4 transition hover:bg-[#F3F3F3] cursor-pointer"
          onClick={handleClick}
        >
          <div className="text-base text-[#595959] mb-2 font-inter">
            {formatForDisplay(el.timestamp)}
          </div>
          <div className="text-base leading-relaxed text-gray-800">
            {el.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LeftPanel;
