interface ProjectEvaluatedCountProps {
  evaluatedMembersCount: number;
}

const ProjectEvaluatedCount = ({ evaluatedMembersCount }: ProjectEvaluatedCountProps) => {
  return (
    <p className="flex items-end gap-2">
      <span className="text-gray-500 display5">지금까지 평가한 팀원 수:</span>
      <strong className="text-purple-500 display6">{evaluatedMembersCount || 0}</strong>
    </p>
  );
};

export default ProjectEvaluatedCount;
