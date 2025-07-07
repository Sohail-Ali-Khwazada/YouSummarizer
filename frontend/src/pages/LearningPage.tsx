import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";

function LearningPage() {
  return (
    <div className="Learning-container flex h-[90vh]">
      {/* left panel */}
      <LeftPanel />

      {/* right panel */}
      <RightPanel/>
      
    </div>
  );
}

export default LearningPage;
