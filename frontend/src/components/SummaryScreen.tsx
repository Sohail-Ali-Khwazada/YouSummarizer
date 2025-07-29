import { useGlobalContext } from "@/context/GlobalContext"

function SummaryScreen() {
  const { selectedVideo } = useGlobalContext();
  return (
    <div className="">
      {selectedVideo?.summary}
    </div>
  )
}

export default SummaryScreen
