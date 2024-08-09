import type { PRismEvaluation, RadialEvaluationType } from '@/models/prism/prismModels';

interface PRismData {
  communication: number;
  proactivity: number;
  problemSolving: number;
  responsibility: number;
  cooperation: number;
}

interface RadialData {
  leadership: number;
  reliability: number;
  teamwork: number;
}

/**
 * 원시 점수(0-5)를 백분율(0-100)로 변환하고 반올림
 * @param score - 원시 점수 (0-5)
 * @returns 반올림된 백분율 정수
 */
export function formatPRismScore(score: number): number {
  return Math.round((score / 5) * 100);
}
/**
 * 데이터를 PRismChart 차트에 사용할 수 있는 형식으로 변환
 * @param prismData - 원시 PRism 데이터
 * @returns 차트용으로 형식화된 PRism 데이터
 */
export function formatPRismChartData(prismData: PRismData): PRismEvaluation[] {
  return [
    { evaluation: 'COMMUNICATION', percent: formatPRismScore(prismData.communication) },
    { evaluation: 'PROACTIVITY', percent: formatPRismScore(prismData.proactivity) },
    { evaluation: 'PROBLEM_SOLVING', percent: formatPRismScore(prismData.problemSolving) },
    { evaluation: 'RESPONSIBILITY', percent: formatPRismScore(prismData.responsibility) },
    { evaluation: 'COOPERATION', percent: formatPRismScore(prismData.cooperation) },
  ];
}

/**
 * 데이터를 방사형 차트에 사용할 수 있는 형식으로 변환
 * @param radialData - 원시 방사형 데이터
 * @returns 차트용으로 형식화된 방사형 데이터
 */
export function formatRadialChartData(
  radialData: RadialData,
): Record<RadialEvaluationType, number> {
  return {
    LEADERSHIP: formatPRismScore(radialData.leadership),
    RELIABILITY: formatPRismScore(radialData.reliability),
    TEAMWORK: formatPRismScore(radialData.teamwork),
  };
}
