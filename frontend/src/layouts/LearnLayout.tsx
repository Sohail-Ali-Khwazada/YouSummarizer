import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

function LearnLayout() {
  return (
    <>
      <Navbar />
      <div className="mt-18 min-h-[90vh]">
        <Outlet />
      </div>
    </>
  );
}

export default LearnLayout;
