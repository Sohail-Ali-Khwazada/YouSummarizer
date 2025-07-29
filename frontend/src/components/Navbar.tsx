import logo from "@/assets/you_logo.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useGlobalContext } from "@/context/GlobalContext";

gsap.registerPlugin(useGSAP);

function Navbar() {
  const logoref = useRef<HTMLDivElement | null>(null);
  const navtagsref = useRef<HTMLDivElement | null>(null);
  const navbuttonref = useRef<HTMLDivElement | null>(null);
  const { authUser, setAuthUser, selectedVideo,setSelectedVideo } = useGlobalContext();
  const navigate = useNavigate();

  const handleAuth = () => {
    if (authUser) {
      localStorage.removeItem("you-user");
      setAuthUser(null);
      setSelectedVideo(null);
      navigate("/");
    } else {
      navigate("/signup");
    }
  };

  useGSAP(() => {
    gsap.from([logoref.current, navtagsref.current, navbuttonref.current], {
      y: -50,
      duration: 0.6,
      opacity: 0,
      stagger: 0.2,
    });
  });

  return (
    <nav className="flex backdrop-blur-lg bg-white/50 pb-4 pt-4 border-b border-[#F6F6F6] fixed top-0 w-full z-10">
      <Link to={"/"}>
        <div className="ml-28 flex gap-2 cursor-pointer items-center" ref={logoref}>
          <img src={logo} alt="logo" className="w-8 h-8 mix-blend-multiply" />
          <div className="font-bold tracking-wide">{!selectedVideo && "YouSummarizer"}</div>
        </div>
      </Link>

      {selectedVideo ? (
        <div
          className="flex text-gray-900 ml-4 items-center"
          ref={navtagsref}
        >
          {selectedVideo.title}
        </div>
      ) : (
        <div
          className="flex list-none gap-16 font-medium text-gray-500 ml-12 items-center"
          ref={navtagsref}
        >
          <Link to={"/"}>
            <li className="cursor-pointer">Features</li>
          </Link>
          <Link to={"/learn"}>
            <li className="cursor-pointer">Learn</li>
          </Link>
          <Link to={"/"}>
            <li className="cursor-pointer">Careers</li>
          </Link>
        </div>
      )}

      <div
        className="ml-auto mr-28 bg-black py-1.5 px-4 rounded-full"
        ref={navbuttonref}
      >
        <button className="text-white cursor-pointer" onClick={handleAuth}>
          {authUser ? "Sign out" : "Get Started"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
