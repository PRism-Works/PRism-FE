interface ProjectCardInfoProps {
  projectName: string;
  projectDescription: string;
}
export default function ProjectCardInfo({ projectName, projectDescription }: ProjectCardInfoProps) {
  return (
    <div
      aria-label="프로젝트 이름 및 설명"
      className="w-[200px] gap-y-4 overflow-hidden flex-col-center">
      <h2 className="text-gray-800 body6">{projectName}</h2>
      <p className="text-gray-600 line-clamp-3 w-[200px] text-ellipsis break-keep text-center display5">
        {projectDescription}
      </p>
    </div>
  );
}
