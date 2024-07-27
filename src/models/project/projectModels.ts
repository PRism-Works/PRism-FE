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

// 프로젝트 요약 카드에 쓰이는 interface
export interface ProjectSummaryData {
  projectId: number;
  projectName: string;
  startDate: Date;
  endDate: Date;
  organizationName?: string;
  categories?: string[];
  evaluation?: string;
  projectVisibility?: boolean; // 프로젝트에 대한 참여 유저의 익명 여부
  evaluatedMembersCount?: number;
}

// 프로젝트 요약 카드 variant (ProjectSummaryCard 안으로 옮기려했으나, 번들링 오류로 위치 유지)
export const PROJECT_CARD_VARIANT = {
  ADMIN: 'Admin', // 관리자 모드에서 내가 등록한 프로젝트 요약 조회
  LINK_PREVIEW: 'LinkPreview', // 내 프로필에서 조회되는 내가 참여한 프로젝트 요약
  MY_PROFILE: 'MyProfile', // 프로젝트 연동을 위해 조회할 때 사용
  OTHER_PROFILE: 'OtherProfile', // 다른 사용자의 프로필에서 프로젝트 조회 시 사용
  SEARCH_RESULT: 'SearchResult', // 홈 검색에서 프로젝트 검색 결과 표시 시 사용
} as const;

export type ProjectSummaryCardVariant =
  (typeof PROJECT_CARD_VARIANT)[keyof typeof PROJECT_CARD_VARIANT];
