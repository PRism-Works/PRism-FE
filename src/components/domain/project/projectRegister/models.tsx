import { z } from 'zod';
import { HeartHandshake, LucideFileEdit, UserCheck } from 'lucide-react';

interface Step {
  title: string;
  subTitle: string;
  icon: JSX.Element;
}

export const STEPS: Step[] = [
  {
    title: '프로젝트에 대한 정보를 알려주세요!',
    subTitle: '팀원끼리 검색이 편해져요',
    icon: <LucideFileEdit className="h-6 w-6" />,
  },
  {
    title: '팀원들에 대한 정보를 알려주세요!',
    subTitle: '모든 팀원을 평가해 줄 수 있어요',
    icon: <UserCheck className="h-6 w-6" />,
  },
  {
    title: '프로젝트 산출물 정보를 알려주세요!',
    subTitle: '신뢰도 높은 프로필을 만드는 데 필요해요',
    icon: <HeartHandshake className="h-6 w-6" />,
  },
];

export const MAX_STEPS = 1; //STEPS.length - 1;

export const ProjectFormSchema = z.object({
  project_name: z.string().min(1, {
    message: '필수 입력값입니다',
  }),
  organization_name: z.string().optional(),
  start_date: z.date(),
  end_date: z.date(),
});

export type ProjectForm = z.infer<typeof ProjectFormSchema>;

// interface ProjectMember {
//   name: string;
//   email: string;
//   role: string;
// }

// export interface Project {
//   project_name: string; // 필수값
//   project_description: string;
//   organization_name: string; //100자 제한
//   hash_tags: string[];
//   skills: string[];
//   start_date: Date;
//   end_date: Date;
//   visibility: boolean;
//   project_url_link: string;
//   members: ProjectMember[];
// }
