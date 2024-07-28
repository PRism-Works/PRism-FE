export const SURVEY_QUESTION_TYPE = {
  SingleChoice: 'singleChoice',
  MultipleChoiceMember: 'multipleChoiceMember',
  ShortAnswer: 'shortAnswer',
} as const;

export type SurveyQuestionsType = (typeof SURVEY_QUESTION_TYPE)[keyof typeof SURVEY_QUESTION_TYPE];

export type SurveyQuestionCategoryType =
  | 'responsibility'
  | 'initiative'
  | 'problemSolving'
  | 'communication'
  | 'teamwork'
  | 'strength'
  | 'improvementPoint';

export interface SurveyQuestion {
  id: number;
  type: SurveyQuestionsType;
  text: string;
  category: SurveyQuestionCategoryType;
}

export interface CommonProps {
  currentStep: number;
  totalSteps: number;
  question: { id: number; text: string };
  stepNumber: number;
  teamMembers: string[];
  options?: string[];
}

export interface RatingAnswerProps extends CommonProps {}

export interface CheckBoxAnswerProps extends CommonProps {}

export interface TextAnswerProps extends CommonProps {}

export interface SurveyStep {
  component: React.ComponentType<CommonProps>;
  question: { id: number; text: string };
  stepNumber: number;
  teamMembers: string[];
  options?: string[];
}
