import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LandingPage from "@/components/LandingPage";

function App() {
  return (
    <>
      <Navbar />
      <div className="px-[7rem] pt-44 pb-20">
        <LandingPage />
      </div>
      <Footer />
    </>
  );
}

export default App;
