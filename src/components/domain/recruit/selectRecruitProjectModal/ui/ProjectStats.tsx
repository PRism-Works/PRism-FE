import { Eye, Star } from 'lucide-react';

export default function ProjectStats() {
  return (
    <div className="text-gray-400 gap-x-2 flex-center">
      <div className="gap-x-1.5 flex-center">
        <Star className="h-[18px] w-[18px]" />
        13
      </div>
      <div className="gap-x-1.5 flex-center">
        <Eye className="h-[18px] w-[18px]" />
        200
      </div>
    </div>
  );
}
