import { useEffect, useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { useGlobalContext } from "@/context/GlobalContext";

function ChatScreen() {
  const { authUser, chatMessages, setChatMessages } = useGlobalContext();
  const [input, setInput] = useState<string>("");
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    setChatMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/video/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authUser?.token,
          },
          body: JSON.stringify({ question: input }),
        }
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setChatMessages((prev) => [...prev, { from: "bot", text: data.answer }]);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [chatMessages]);

  return (
    <div className="flex flex-col bg-white text-gray-900 h-full overflow-hidden">
      <div className="overflow-y-auto p-4 space-y-4 h-[90vh]">
        {chatMessages.map((msg, i) => {
          if (msg.from == "user") {
            return (
              <div
                key={i}
                className="bg-[#F3F3F3] p-3 rounded-lg max-w-[65%] ml-auto text-lg"
              >
                {msg.text}
              </div>
            );
          } else {
            return (
              <div
                key={i}
                className="prose prose-base max-w-none p-4 leading-snug text-[1.1rem]"
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            );
          }
        })}
        <div ref={lastMessageRef}></div>
      </div>

      <div className="p-4 bg-white flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask anything"
          className="flex-1 p-2 rounded-lg border border-gray-300"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-slate-700 hover:bg-slate-900 text-white rounded-lg cursor-pointer"
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  );
}

export default ChatScreen;
