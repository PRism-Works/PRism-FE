// 추가 평가 유형 상수 및 관련 정보 정의
export const RADIAL_EVALUATION_TYPES = {
  LEADERSHIP: 'LEADERSHIP',
  RELIABILITY: 'RELIABILITY',
  TEAMWORK: 'TEAMWORK',
} as const;

export type RadialEvaluationType =
  (typeof RADIAL_EVALUATION_TYPES)[keyof typeof RADIAL_EVALUATION_TYPES];

// PRism 평가 유형 상수 및 관련 정보 정의
export const PRISM_EVALUATIONS = [
  'COMMUNICATION',
  'PROACTIVITY',
  'PROBLEM_SOLVING',
  'RESPONSIBILITY',
  'COOPERATION',
] as const;
export type PRismEvaluationType = (typeof PRISM_EVALUATIONS)[number];

export const EVALUATION_LABELS: Record<PRismEvaluationType, string> = {
  COMMUNICATION: '의사소통능력',
  PROACTIVITY: '적극성',
  PROBLEM_SOLVING: '문제해결능력',
  RESPONSIBILITY: '책임감',
  COOPERATION: '협동심',
};

export interface Evaluation {
  evaluation: PRismEvaluationType;
  percent: number;
}
