import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarGroup = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* Avatar Stack */}
      <div className="flex -space-x-3.5">
        <Avatar className="w-9 h-9 border-4 border-white">
          <AvatarImage src="https://via.placeholder.com/40" alt="A" />
          <AvatarFallback className="bg-blue-500 text-white text-base">A</AvatarFallback>
        </Avatar>
        <Avatar className="w-9 h-9 border-4 border-white">
          <AvatarImage src="https://via.placeholder.com/40" alt="R" />
          <AvatarFallback className="bg-orange-500 text-white text-base">R</AvatarFallback>
        </Avatar>
        <Avatar className="w-9 h-9 border-4 border-white">
          <AvatarImage src="https://via.placeholder.com/40" alt="Z" />
          <AvatarFallback className="bg-black text-white text-base">Z</AvatarFallback>
        </Avatar>
        <Avatar className="w-9 h-9 border-4 border-white">
          <AvatarImage src="https://via.placeholder.com/40" alt="A" />
          <AvatarFallback className="bg-teal-500 text-white text-base">A</AvatarFallback>
        </Avatar>
      </div>

      {/* Text */}
      <span className="text-gray-600 text-sm">Loved by over 1 million learners</span>
    </div>
  );
};

export default AvatarGroup;
