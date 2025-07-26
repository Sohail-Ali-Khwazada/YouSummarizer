import { Input } from "@/components/ui/input";
import { FaCircleArrowUp } from "react-icons/fa6";
import { CiPlay1 } from "react-icons/ci";
import { Card } from "@/components/ui/card";

function SearchPage() {
  return (
    <div className="bg-white/50 dark:bg-[#171717] h-full dark:text-white">
      <div className="flex flex-col justify-center items-center gap-8 h-80">
        <p className="font-semibold text-4xl">What do you want to learn?</p>
        <div className="w-[35rem] relative">
          <Input type="url" placeholder="Paste your link" className="h-11" />
          <FaCircleArrowUp className="size-7 absolute top-[0.5rem] right-4 text-[#8A8A8A] cursor-pointer" />
        </div>
      </div>

      {/* Recents */}
      <div className="flex flex-col gap-4 pb-10">
        <div className="text-xl">Recents</div>
        {/* Cards */}
        <div className="">
          <Card className="w-[18rem] h-[14.5rem] cursor-pointer rounded-2xl pt-0 overflow-hidden">
              <img src="https://i.ytimg.com/vi/ZuiIvevLg40/maxresdefault.jpg" alt="thumbnail" className="object-cover"/>
              <div className="flex items-center gap-2 px-4">
                <CiPlay1 />
                <div className="font-normal">Former FBI Agent: If They Do ...</div>
              </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

export default SearchPage;
