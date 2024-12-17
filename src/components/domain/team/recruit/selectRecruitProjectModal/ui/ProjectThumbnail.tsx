import Image from 'next/image';
import EmptyProjectImage from '@/assets/project/empty-thumbnail.png';

interface ProjectThumbnailProps {
  projectThumbnailUrl?: string;
}
export default function ProjectThumbnail({ projectThumbnailUrl }: ProjectThumbnailProps) {
  return (
    <div
      aria-label="프로젝트 썸네일"
      className="h-[120px] w-60 flex-shrink-0 rounded-[10px] bg-gray-200 flex-center">
      <Image
        src={projectThumbnailUrl || EmptyProjectImage}
        width={240} // w-60는 240px
        height={120}
        className="rounded-[10px] object-cover"
        alt="프로젝트 썸네일"
      />
    </div>
  );
}
