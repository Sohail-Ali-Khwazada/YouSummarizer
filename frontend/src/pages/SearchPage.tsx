import { Input } from "@/components/ui/input";
import { FaCircleArrowUp } from "react-icons/fa6";
import { CiPlay1 } from "react-icons/ci";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useGlobalContext, type video } from "@/context/GlobalContext";



function SearchPage() {
  const [input, setInput] = useState<string>("");
  const [videos, setVideos] = useState<video[]>([]);
  const { authUser } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = async() => {

    const videoId = input.split('v=')[1];
    if(!videoId) {
      toast.error("Enter a valid youtube url");
      return;
    }

    navigate(`/learn/${videoId}`);
  }


  useEffect(()=> {
    const fetchAllvideos = async() => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/video/getAllVideos`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authUser?.token,
          }
        })
        const data = await res.json();
        if(data.error) {
          throw new Error(data.error);
        }
        setVideos(data);
      }
      catch(error) {
        if(error instanceof Error) {
          toast.error(error.message)
        }
      }
    }
    fetchAllvideos();
  },[])

  return (
    <div className="bg-white/50 dark:bg-[#171717] h-full dark:text-white">
      <div className="flex flex-col justify-center items-center gap-8 h-80">
        <p className="font-semibold text-4xl">What do you want to learn?</p>
        <div className="w-[35rem] relative">
          <Input 
          type="url" 
          placeholder="Paste your link" 
          className="h-11" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />
          <FaCircleArrowUp 
          className="size-7 absolute top-[0.5rem] right-4 text-[#8A8A8A] cursor-pointer"
          onClick={handleSubmit} 
          />
        </div>
      </div>

      {/* Recents */}
      <div className="flex flex-col gap-4 pb-10">
        <div className="text-xl">Recents</div>
        {/* Cards */}
        <div className="flex gap-5 flex-wrap">
          {
            videos.map((v: video, indx)=> {
              const v_id = v.video_url.split("v=")[1];
              return (<Card 
                key={indx}
                onClick={()=> navigate(`/learn/${v_id}`)}
                className="w-[17rem] h-[14.5rem] cursor-pointer rounded-2xl pt-0 overflow-hidden shrink-0">
                <img 
                  src={`https://img.youtube.com/vi/${v_id}/maxresdefault.jpg`} alt="thumbnail" 
                  />
                <div className="flex items-center gap-2 px-4">
                  <CiPlay1 className="shrink-0"/>
                  <div className="font-normal w-full truncate">{v.title}</div>
                </div>
              </Card>)
            })
          }
        </div>

      </div>
    </div>
  );
}

export default SearchPage;
