import { cn } from '@/lib/utils';

interface ProjectTitleProps {
  projectName: string;
  forSaveImage?: boolean;
}
const ProjectTitle = ({ projectName, forSaveImage = false }: ProjectTitleProps) => {
  return (
    <h2 className={cn('text-gray-800 body7', !forSaveImage && 'overflow-y-auto')}>{projectName}</h2>
  );
};

export default ProjectTitle;
