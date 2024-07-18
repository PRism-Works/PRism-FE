export interface UserDataResponse {
  success: boolean;
  status: number;
  data: {
    userId: string;
    email: string;
    username: string;
    interestJobs: string[];
    skills: string[];
  };
}
