import { SurveyQuestionCategoryType } from './surveyModels';

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

export interface FormResponseDetails {
  revieweeEmail: string;
  response: {
    score?: number;
    choice?: boolean;
    description?: string;
    example?: string;
  };
}

export interface SurveyFormValues {
  [key: string]: {
    questionOrder: string;
    questionType: 'singleChoice' | 'multipleChoiceMember' | 'shortAnswer';
    questionCategory: string;
    responseDetails: FormResponseDetails[];
  };
}

export interface SubmitSurveyRequest {
  reviewerEmail: string;
  responses: {
    questionOrder: string;
    questionType: 'singleChoice' | 'multipleChoiceMember' | 'shortAnswer';
    questionCategory: SurveyQuestionCategoryType;
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

export interface FormSurveyResponse {
  reviewerEmail: string;
  responses: {
    questionOrder: string;
    questionType: 'singleChoice' | 'multipleChoiceMember' | 'shortAnswer';
    questionCategory: SurveyQuestionCategoryType;
    responseDetails: FormResponseDetails[];
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
