import { z } from 'zod';

// 1. Constants (상수)

// 연락 방법 관련 상수
export const CONTACT_METHODS = {
  EMAIL: 'email',
  KAKAO: 'kakao',
  LINE: 'line',
  TELEGRAM: 'telegram',
  OTHER: 'other',
} as const;

// 신청 방법 관련 상수
export const APPLICATION_METHODS = {
  EMAIL: 'email',
  KAKAO: 'kakao',
  FORM: 'form',
  OTHER: 'other',
} as const;

// 진행 방식 관련 상수
export const PROGRESS_METHODS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  BOTH: 'both',
} as const;

// 직무 관련 상수
export const POSITION_TYPES = {
  PM: 'pm',
  MARKETER: 'marketer',
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  FULLSTACK: 'fullstack',
  DESIGNER: 'designer',
  IOS: 'iOS',
  ANDROID: 'android',
  DEVOPS: 'devops',
  QA: 'qa',
} as const;

// 2. Types (타입 정의)
export type ContactMethodType = (typeof CONTACT_METHODS)[keyof typeof CONTACT_METHODS];
export type ApplicationMethodType = (typeof APPLICATION_METHODS)[keyof typeof APPLICATION_METHODS];
export type ProgressMethodType = (typeof PROGRESS_METHODS)[keyof typeof PROGRESS_METHODS];
export type PositionType = (typeof POSITION_TYPES)[keyof typeof POSITION_TYPES];

// 3. Labels (상수이지만 타입에 의존하므로 타입 정의 후에 위치)
export const CONTACT_METHOD_LABELS: Record<ContactMethodType, string> = {
  [CONTACT_METHODS.EMAIL]: '이메일',
  [CONTACT_METHODS.KAKAO]: '오픈 카톡',
  [CONTACT_METHODS.LINE]: '라인',
  [CONTACT_METHODS.TELEGRAM]: '텔레그램',
  [CONTACT_METHODS.OTHER]: '기타',
};

export const APPLICATION_METHOD_LABELS: Record<ApplicationMethodType, string> = {
  [APPLICATION_METHODS.EMAIL]: '이메일',
  [APPLICATION_METHODS.KAKAO]: '오픈 카톡',
  [APPLICATION_METHODS.FORM]: '구글 폼',
  [APPLICATION_METHODS.OTHER]: '기타',
};

export const PROGRESS_METHOD_LABELS: Record<ProgressMethodType, string> = {
  [PROGRESS_METHODS.ONLINE]: '온라인',
  [PROGRESS_METHODS.OFFLINE]: '오프라인',
  [PROGRESS_METHODS.BOTH]: '온라인 & 오프라인',
};

export const POSITION_LABELS: Record<PositionType, string> = {
  [POSITION_TYPES.PM]: '기획자/PM',
  [POSITION_TYPES.MARKETER]: '마케터',
  [POSITION_TYPES.FRONTEND]: '프론트엔드',
  [POSITION_TYPES.BACKEND]: '백엔드',
  [POSITION_TYPES.FULLSTACK]: '풀스택',
  [POSITION_TYPES.DESIGNER]: '디자이너',
  [POSITION_TYPES.IOS]: 'iOS',
  [POSITION_TYPES.ANDROID]: 'Android',
  [POSITION_TYPES.DEVOPS]: 'devops',
  [POSITION_TYPES.QA]: 'QA',
};

// 4. Zod Schemas for Methods (메소드 스키마)
const contactMethodSchema = z.enum([
  CONTACT_METHODS.EMAIL,
  CONTACT_METHODS.KAKAO,
  CONTACT_METHODS.LINE,
  CONTACT_METHODS.TELEGRAM,
  CONTACT_METHODS.OTHER,
]);

const applicationMethodSchema = z.enum([
  APPLICATION_METHODS.EMAIL,
  APPLICATION_METHODS.KAKAO,
  APPLICATION_METHODS.FORM,
  APPLICATION_METHODS.OTHER,
]);

const progressMethodSchema = z.enum([
  PROGRESS_METHODS.ONLINE,
  PROGRESS_METHODS.OFFLINE,
  PROGRESS_METHODS.BOTH,
]);

const positionTypeSchema = z.enum([
  POSITION_TYPES.PM,
  POSITION_TYPES.MARKETER,
  POSITION_TYPES.FRONTEND,
  POSITION_TYPES.BACKEND,
  POSITION_TYPES.FULLSTACK,
  POSITION_TYPES.DESIGNER,
  POSITION_TYPES.IOS,
  POSITION_TYPES.ANDROID,
  POSITION_TYPES.DEVOPS,
  POSITION_TYPES.QA,
]);

// 5. Interface
export interface TeamRecruitFormValues {
  startDate: Date | null;
  endDate: Date | null;
  isOpenEnded: boolean;
  contactMethod: ContactMethodType;
  contactLink: string;
  applicationMethod: ApplicationMethodType;
  applicationLink: string;
  progressMethod: ProgressMethodType;
  positions: {
    title: PositionType | undefined;
    count: number | 'undecided' | undefined;
  }[];
  title: string;
  details: string;
}

// 6. Schemas (스키마 정의)
const PositionSchema = z.object({
  title: positionTypeSchema.optional().superRefine((val, ctx) => {
    if (val === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '모집 포지션을 선택해 주세요.',
      });
    }
  }),
  count: z
    .union([z.number(), z.literal('undecided')])
    .optional()
    .superRefine((val, ctx) => {
      if (val === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '모집 인원을 입력해 주세요.',
        });
      }
    }),
});

export const TeamRecruitFormSchema = z
  .object({
    startDate: z
      .date({
        required_error: '모집 시작일을 선택해 주세요.',
      })
      .nullable()
      .refine((date) => date !== null, {
        message: '모집 시작일을 선택해 주세요.',
      }),
    endDate: z
      .date({
        required_error: '모집 마감일을 선택해 주세요.',
      })
      .nullable(),
    isOpenEnded: z.boolean().default(false),

    contactMethod: contactMethodSchema.refine((val) => val !== undefined, {
      message: '연락 방법을 선택해 주세요.',
    }),
    contactLink: z
      .string({
        required_error: '연락 링크를 입력해 주세요.',
      })
      .min(1, '연락 링크를 입력해 주세요.'),

    applicationMethod: applicationMethodSchema.refine((val) => val !== undefined, {
      message: '신청 방법을 선택해 주세요.',
    }),
    applicationLink: z
      .string({
        required_error: '신청 링크를 입력해 주세요.',
      })
      .min(1, '신청 링크를 입력해 주세요.'),

    progressMethod: progressMethodSchema,

    positions: z.array(PositionSchema).min(1, '최소 1개 이상의 모집 포지션을 입력해 주세요.'),

    title: z
      .string({
        required_error: '제목을 입력해 주세요.',
      })
      .min(1, '제목을 입력해 주세요.')
      .max(100, '제목은 100자 이내로 입력해 주세요.'),

    details: z
      .string({
        required_error: '설명을 입력해주세요.',
      })
      .min(1, '설명을 입력해주세요.')
      .max(10000, '설명은 10000자 이내로 입력해 주세요.'),
  })
  .refine(
    (data) => {
      if (!data.isOpenEnded) {
        return data.endDate !== null;
      }
      return true;
    },
    {
      message: '모집 마감일을 선택해 주세요.',
      path: ['endDate'],
    },
  );

// 7. Default Values (기본값 정의)
export const DEFAULT_TEAM_RECRUIT_VALUES: TeamRecruitFormValues = {
  startDate: null,
  endDate: null,
  isOpenEnded: false,
  contactMethod: CONTACT_METHODS.KAKAO,
  contactLink: '',
  applicationMethod: APPLICATION_METHODS.KAKAO,
  applicationLink: '',
  progressMethod: PROGRESS_METHODS.ONLINE,
  positions: [{ title: undefined, count: undefined }],
  title: '',
  details: '',
} as const;
