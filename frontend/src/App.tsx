import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LandingPage from "@/components/LandingPage";

function App() {
  return (
    <>
      <Navbar />
      <div className="px-[7rem] py-44">
        <LandingPage />
      </div>
      <Footer />
    </>
  );
}

export default App;
