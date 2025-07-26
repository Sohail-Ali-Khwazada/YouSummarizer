import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

function LearnLayout() {
  return (
    <>
      <Navbar />
      <div className="mt-18 h-[90vh] px-4">
        <Outlet />
      </div>
    </>
  );
}

export default LearnLayout;
