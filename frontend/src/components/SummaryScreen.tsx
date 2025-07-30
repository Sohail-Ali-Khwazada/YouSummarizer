import { useGlobalContext } from "@/context/GlobalContext"
import ReactMarkdown from "react-markdown";

function SummaryScreen() {
  const { selectedVideo } = useGlobalContext();
  return (
    <div className="prose prose-base max-w-none p-4 leading-snug text-[1.1rem]">
      {selectedVideo?.summary && (
        <ReactMarkdown>{selectedVideo.summary}</ReactMarkdown>
      )}
    </div>
  );
}

export default SummaryScreen