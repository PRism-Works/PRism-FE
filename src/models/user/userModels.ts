// 로그인 한 유저의 데이터
export interface User {
  userId: string; // 유저 식별자
  name: string;
  email: string;
  roles: string[]; // 관심 직무
  skills: string[]; // 보유 스킬
}

// 유저 요약 카드에 쓰이는 interface
export interface UserSummaryData {
  userId: string; // 유저 식별자
  name: string;
  email: string;
  roles: string[];
}

// 유저 요약 카드 variant
export const USER_CARD_VARIANT = {
  NON_MEMBER: 'NonMember', // 비회원 사용자 카드
  MEMBER_PRIVATE: 'MemberPrivate', // 회원이지만 비공개 설정된 카드
  MEMBER_PUBLIC: 'MemberPublic', // 회원이며 공개 설정된 카드
} as const;

export type UserSummaryCardVariant = (typeof USER_CARD_VARIANT)[keyof typeof USER_CARD_VARIANT];
