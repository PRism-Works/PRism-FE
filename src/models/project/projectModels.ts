import { z } from 'zod';

export interface ProjectRegisterHeaderStep {
  title: string;
  subTitle: string;
  icon: JSX.Element;
}

const ProjectMemberSchema = z.object({
  name: z.string().min(1, {
    message: '이름을 입력해주세요.',
  }),
  email: z.string().email({
    message: '올바른 이메일 주소를 입력해주세요.',
  }),
  roles: z.array(z.string()).min(1, {
    message: '팀원의 역할을 입력해주세요.',
  }),
});

export const ProjectFormSchema = z.object({
  projectName: z.string().min(1, {
    message: '이름을 입력해주세요.',
  }),
  organizationName: z.string(),
  startDate: z.string().date(),
  endDate: z.string().date(),
  members: z.array(ProjectMemberSchema),
  projectUrlLink: z.string(),
  projectDescription: z.string(),
  skills: z.array(z.string()),
  categories: z.array(z.string()),
});

export type ProjectMember = z.infer<typeof ProjectMemberSchema>;
export type ProjectForm = z.infer<typeof ProjectFormSchema>;
