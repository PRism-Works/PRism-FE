export interface SurveyLinkRequest {
  code: string;
}

export interface SurveyLinkResponse {
  success: boolean;
  status: number;
  data: {
    revieweeEmails: string[];
    projectId: string;
  };
}

export interface SurveyLinkErrorResponse {
  code: string;
  message: string;
}

export interface SendSurveyLinkRequest {
  projectId: number;
}

export interface SendSurveyLinkResponse {
  success: boolean;
  status: number;
  data: null;
}

export interface SendSurveyLinkErrorResponse {
  code: string;
  message: string;
}

// Form data structure
export interface FormResponseDetails {
  revieweeEmail: string;
  response: {
    score?: number;
    choice?: boolean;
    description?: string;
    example?: string;
  };
}

export interface FormSurveyResponse {
  reviewerEmail: string;
  responses: {
    questionOrder: string;
    questionType: 'singleChoice' | 'multipleChoiceMember' | 'shortAnswer';
    questionCategory:
      | 'responsibility'
      | 'initiative'
      | 'problemSolving'
      | 'communication'
      | 'teamwork'
      | 'strength'
      | 'improvementPoint';
    responseDetails: FormResponseDetails[];
  }[];
}

export interface SubmitSurveyRequest {
  reviewerEmail: string;
  responses: {
    questionOrder: string;
    questionType: 'singleChoice' | 'multipleChoiceMember' | 'shortAnswer';
    questionCategory:
      | 'responsibility'
      | 'initiative'
      | 'problemSolving'
      | 'communication'
      | 'teamwork'
      | 'strength'
      | 'improvementPoint';
    responseDetails: {
      revieweeEmail: string;
      response: {
        score?: number;
        choice?: boolean;
        description?: string;
        example?: string;
      };
    }[];
  }[];
}

export interface SubmitSurveyResponse {
  success: boolean;
  status: number;
  data: null;
}

export interface SubmitSurveyErrorResponse {
  code: string;
  reason: string;
}
