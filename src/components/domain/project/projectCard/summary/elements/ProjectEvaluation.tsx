import { cn } from '@/lib/utils';

interface ProjectEvaluationProps {
  evaluation: string;
  forSaveImage?: boolean;
}

const ProjectEvaluation = ({ evaluation, forSaveImage = false }: ProjectEvaluationProps) => {
  const className = cn('text-gray-800 display4', {
    'text-gray-300': !evaluation,
    'overflow-y-auto': !forSaveImage,
  });
  return (
    <div className="flex flex-col justify-center">
      <h3 className="text-gray-400 mobile1">팀원 평가 요약</h3>
      <p className={className}>{evaluation || '등록된 한 줄 평가가 없습니다.'}</p>
    </div>
  );
};

export default ProjectEvaluation;
