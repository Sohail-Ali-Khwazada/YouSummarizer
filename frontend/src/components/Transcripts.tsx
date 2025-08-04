import { useGlobalContext } from "@/context/GlobalContext";
import { useEffect, useRef } from "react";

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

export default Transcripts;