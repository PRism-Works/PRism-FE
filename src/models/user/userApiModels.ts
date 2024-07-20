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

export interface UserProfileResponse {
  success: boolean;
  status: number;
  data: {
    username: string;
    email: string;
    interestJobs: string[];
    skills: string[];
    introduction?: string;
  };
}

export interface UpdateProfileRequest {
  username: string;
  skills: string[];
  interestJobs: string[];
  introduction?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  status: number;
  data: null;
}
