// PRism 평가 유형 상수 및 관련 정보 정의
export const PRISM_EVALUATIONS = [
  'COMMUNICATION',
  'PROACTIVITY',
  'PROBLEM_SOLVING',
  'RESPONSIBILITY',
  'COOPERATION',
] as const;
export type PRismEvaluationType = (typeof PRISM_EVALUATIONS)[number];

export const PRISM_EVALUATION_LABELS: Record<PRismEvaluationType, string> = {
  COMMUNICATION: '의사소통능력',
  PROACTIVITY: '적극성',
  PROBLEM_SOLVING: '문제해결능력',
  RESPONSIBILITY: '책임감',
  COOPERATION: '협동심',
};

// Prism Chart 데이터
export interface PRismEvaluation {
  evaluation: PRismEvaluationType;
  percent: number;
}

// Radial 차트 유형 상수 및 관련 정보 정의
export const RADIAL_EVALUATIONS = ['LEADERSHIP', 'RELIABILITY', 'TEAMWORK'] as const;
export type RadialEvaluationType = (typeof RADIAL_EVALUATIONS)[number];

export const RADIAL_EVALUATION_LABELS: Record<RadialEvaluationType, string> = {
  LEADERSHIP: '리더십',
  RELIABILITY: '신뢰도',
  TEAMWORK: '팀워크',
};
