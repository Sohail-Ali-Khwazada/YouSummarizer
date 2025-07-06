import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AvatarGroup from "@/components/AvatarGroup";
import CardGroup from "@/components/CardGroup";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function LandingPage() {
  useGSAP(() => {
    gsap.from(".Landing-heading div", {
      y: -60,
      duration: 0.4,
      opacity: 0,
      stagger: 0.1,
      ease: "none",
    });

    gsap.to(".Landing-img-container div", {
      scale: 1.5,
      rotateX: 0,
      scrollTrigger: {
        trigger: ".Landing-img-container",
        scrub: 2,
        start: "top 85%",
        end: "top 20%",
      },
    });
  });

  return (
    <div className="Landing-wrapper">
      {/* heading section */}
      <div className="Landing-heading flex flex-col gap-5 items-center w-[50rem] mx-auto h-96">
        <div className="font-medium text-[3.5rem]">
          An Al tutor made for you
        </div>
        <div className="font-normal text-xl text-gray-500">
          Learn from an AI tutor that understands your pdfs, videos, and
          recorded lectures
        </div>
        <div className="mt-3 flex gap-4">
          <button className="bg-white text-black py-3 px-8 rounded-full border text-lg">
            See features
          </button>

          <Link to="/signup">
            <button className="bg-black text-white py-3 px-8 rounded-full text-lg cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>

        <div className="mt-3">
          <AvatarGroup />
        </div>
      </div>

      {/* video section */}
      <div className="Landing-img-container transform-3d perspective-[1000px] mt-20">
        <div className="w-[45rem] h-[60vh] mx-auto rounded-2xl border-4 border-[#4F4F4F] overflow-hidden rotate-x-[25deg]">
          <video
            src="https://framerusercontent.com/assets/5JGYAIJtluYhmfGE0fIwnseS0.mp4"
            muted
            autoPlay
            loop
            playsInline
            className="h-full w-full object-cover"
          ></video>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="Landing-carousel-container mt-45">
        <CardGroup />
      </div>

      {/* Bottom card to signup */}
      <div className="Landing-get-started-container bg-[#F6F6F6] h-[25rem] w-full rounded-4xl mt-24 flex justify-center items-center">
        <div className="flex flex-col gap-5 justify-center items-center">
          <p className="font-semibold text-4xl">Learn smarter,faster,easier.</p>
          <p className="text-gray-500">
            Upload your content and start your learning journey.
          </p>
          <Link to="/signup">
            <Button className="rounded-3xl w-36 h-12 text-md cursor-pointer">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
