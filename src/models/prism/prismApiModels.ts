export interface PRismReportResponse {
  success: boolean;
  status: number;
  data: {
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
    isEvaluationEmpty?: boolean;
  };
}
