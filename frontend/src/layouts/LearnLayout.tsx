import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

function LearnLayout() {
  return (
    <>
      <Navbar />
      <div className="mt-18 bg-black min-h-[90vh] text-white">
        <Outlet />
      </div>
    </>
  );
}

export default LearnLayout;
