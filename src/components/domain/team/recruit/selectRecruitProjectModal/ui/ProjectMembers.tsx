import TagInput from '@/components/common/input/TagInput';
import { useMemo } from 'react';

interface ProjecMembersProps {
  members: {
    roles: string[];
  }[];
}
export default function ProjecMembers({ members }: ProjecMembersProps) {
  const roleCount = useMemo(() => {
    return members.reduce<Record<string, number>>((acc, member) => {
      member.roles.forEach((role) => {
        acc[role] = (acc[role] || 0) + 1;
      });
      return acc;
    }, {});
  }, [members]);
  return (
    <div
      aria-label="프로젝트 참여 인원"
      className="bg-gray-50 h-[170px] w-[400px] gap-y-4 rounded-xl px-10 py-7 flex-col-center">
      <div className="text-gray-600 display7">현재 팀원</div>
      <ul className="flex-wrap gap-2.5 flex-center">
        {Object.entries(roleCount).map(([role, count]) => (
          <li key={role} className="gap-x-2.5 flex-center">
            <TagInput value={role} isDisabled colorTheme="indigo" />
            <span>{count}명</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
