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

// 추가 필요 필드들, 노션의 백엔드 db 스키마 기준으로 작성
// export interface Project {
//   project_description: string; // 프로젝트 설명
//   hash_tags: string[]; // 프로젝트에 대한 해시태그
//   skills: string[]; // 프로젝트에 사용된 기술 스택
//   visibility: boolean; // 프로젝트 자체 공개/비공개 여부 (산출물 링크에 대한 공개/비공개는? 백엔드 문의 필요)
//   project_url_link: string; // 프로젝트 산출물 링크
// }
