import { useGlobalContext } from "@/context/GlobalContext";
import { useEffect, useRef } from "react";

function Chapters({
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
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return 0;
  };

  const formatForDisplay = (timeText: string) => {
    const [h, m, s] = timeText.split(":").map(Number);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return h === 0 ? `${pad(m)}:${pad(s)}` : `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const timestamp = e.currentTarget.getAttribute("data-start");
    if (timestamp) {
      handleSeek(convertIntoSecs(timestamp));
    }
  };

  useEffect(() => {
    if (!selectedVideo || !autoScroll) return;

    const index = selectedVideo.chapter.findIndex((el, i) => {
      const current = convertIntoSecs(el.startTime);
      const next = convertIntoSecs(
        selectedVideo.chapter[i + 1]?.startTime || "99:59:59"
      );
      return currentTime >= current && currentTime < next;
    });

    if (index !== -1 && refs.current[index]) {
      refs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentTime]);

  return (
    <div className="p-6 space-y-6">
      {selectedVideo?.chapter.map((el, index) => (
        <div
          key={index}
          ref={(el) => {refs.current[index] = el}}
          data-start={el.startTime}
          onClick={handleClick}
          className="cursor-pointer rounded-xl p-4 transition hover:bg-[#F3F3F3]"
        >
          <div className="text-base text-[#595959] mb-2 font-inter">
            {formatForDisplay(el.startTime)}
          </div>
          <div className="text-lg font-semibold text-gray-900 leading-snug">
            {el.title}
          </div>
          <div className="text-base text-gray-800 mt-1 leading-relaxed">
            {el.description}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chapters;
