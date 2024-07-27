// PRismReportResponse는 success 구조 없이 데이터만 넘어옴..
export interface PRismReportResponse {
  prismData: {
    problemSolving: number;
    proactivity: number;
    cooperation: number;
    communication: number;
    responsibility: number;
  };
  radialData: {
    leadership: number;
    reliability: number;
    teamwork: number;
    keywords: string[];
    evaluation: string;
  };
}
