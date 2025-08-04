import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "@/context/GlobalContext";

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const popupRef = useRef<Window | null>(null);
  const { setAuthUser } = useGlobalContext();

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    popupRef.current = window.open(
      `${import.meta.env.VITE_BACKEND_URI}/api/auth/google`,
      "googleLogin",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  const handleMessage = (event: MessageEvent) => {
 
    if (!event.data?.token || !event.data?._id) {
      return;
    }

    localStorage.setItem("you-user", JSON.stringify(event.data));
    setAuthUser(event.data);
    toast.success("Signed in with Google");
    navigate("/learn");
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return { handleGoogleLogin };
};
