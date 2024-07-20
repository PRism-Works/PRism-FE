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
  startDate: z.union([z.date(), z.null()]).refine((date) => date !== null, {
    message: '시작 날짜를 선택해주세요.',
  }),
  endDate: z.union([z.date(), z.null()]).refine((date) => date !== null, {
    message: '종료 날짜를 선택해주세요.',
  }),
  members: z.array(ProjectMemberSchema),
  projectUrlLink: z.string(),
  projectDescription: z.string(),
  skills: z.array(z.string()),
  categories: z.array(z.string()),
});

export type ProjectMember = z.infer<typeof ProjectMemberSchema>;

export type ProjectForm = Omit<z.infer<typeof ProjectFormSchema>, 'startDate' | 'endDate'> & {
  startDate: Date | null;
  endDate: Date | null;
};

// 프로젝트 요약 카드에 쓰이는 interface, 추후 작업 진행에 따라 분리되거나 변동될 가능성 있음.
export interface ProjectSummaryData {
  projectId: number;
  projectname: string;
  startDate: Date;
  endDate: Date;
  organizationName?: string;
  categories?: string[];
  evaluation?: string;
  projectVisibility?: boolean;
  evaluatedMembersCount?: number;
}
