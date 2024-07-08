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

export const MAX_STEPS = STEPS.length - 1;

const ProjectMemberSchema = z.object({
  name: z.string().min(1, {
    message: '이름을 입력해주세요.',
  }),
  email: z.string().email({
    message: '올바른 이메일 주소를 입력해주세요.',
  }),
  role: z.string().min(1, {
    message: '팀원의 역할을 입력해주세요.',
  }),
});

export const ProjectFormSchema = z.object({
  project_name: z.string().min(1, {
    message: '이름을 입력해주세요.',
  }),
  organization_name: z.string().optional(),
  start_date: z.string().date(),
  end_date: z.string().date(),
  members: z.array(ProjectMemberSchema).min(1),
});

export type ProjectMember = z.infer<typeof ProjectMemberSchema>;
export type ProjectForm = z.infer<typeof ProjectFormSchema>;

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
