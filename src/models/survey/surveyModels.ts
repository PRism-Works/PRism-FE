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
