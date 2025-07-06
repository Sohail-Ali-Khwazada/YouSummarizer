import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

function HomeLayout() {
  return (
    <>
      <Navbar />
      <div className="px-[7rem] pt-44 pb-20">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default HomeLayout;
