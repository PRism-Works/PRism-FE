import { Eye, Star } from 'lucide-react';

interface ProjectStatsProps {
  bookmarkCount: number; // project즐겨찾기수
  viewCount: number; // project조회수
}
export default function ProjectStats({ bookmarkCount, viewCount }: ProjectStatsProps) {
  return (
    <div className="text-gray-400 gap-x-2 flex-center">
      <div className="gap-x-1.5 flex-center">
        <Star className="h-[18px] w-[18px]" />
        {bookmarkCount}
      </div>
      <div className="gap-x-1.5 flex-center">
        <Eye className="h-[18px] w-[18px]" />
        {viewCount}
      </div>
    </div>
  );
}
