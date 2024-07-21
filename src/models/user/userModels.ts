// 로그인 한 유저의 데이터
export interface User {
  userId: string; // 유저 식별자
  name: string;
  email: string;
  roles: string[]; // 관심 직무
  skills: string[]; // 보유 스킬
}
