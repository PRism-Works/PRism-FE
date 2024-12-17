import { PROJECT_USER_ROLE_VARIANT, type ProjectUserRole } from '@/models/project/projectModels';
import { Crown, Settings, User } from 'lucide-react';

interface ProjectRoleProps {
  myProjectRole: ProjectUserRole;
}

const roleIcon = {
  CREATOR: <Crown className="h-4 w-4 text-yellow-500" />,
  ADMIN: <Settings className="h-4 w-4 text-blue-500" />,
  MEMBER: <User className="text-gray-500 h-4 w-4" />,
};

export default function ProjectRole({ myProjectRole }: ProjectRoleProps) {
  return (
    <div className="bg-gray-100 w-fit gap-x-1 rounded-[6px] px-2.5 py-1.5 mobile2 flex-center">
      {roleIcon[myProjectRole]}
      <span>{PROJECT_USER_ROLE_VARIANT[myProjectRole]}</span>
    </div>
  );
}
