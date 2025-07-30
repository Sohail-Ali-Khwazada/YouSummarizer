import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
import { useGlobalContext } from "@/context/GlobalContext";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";


function LearningPage() {

  const { id } = useParams();
  const { setSelectedVideo } = useGlobalContext();

  useEffect(()=> {
    const fetchVideoData = async() => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/get-video-details`,{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({"video_url" : `https://www.youtube.com/watch?v=${id}`})
        });

        const data = await res.json();
        if(data.error) {
          throw new Error(data.error);
        }
        setSelectedVideo(data);
      } catch(error) {
          if(error instanceof Error) {
            toast.error(error.message);
          }
      }
    }
    fetchVideoData();

    return () => {
      setSelectedVideo(null);
    };

  },[]);

  return (
    <div className="Learning-container flex h-[90vh] overflow-hidden font-roboto">
      {/* left panel */}
      <LeftPanel />

      {/* right panel */}
      <RightPanel/>
      
    </div>
  );
}

export default LearningPage;
