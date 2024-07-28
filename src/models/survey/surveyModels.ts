import { z } from 'zod';

export const SURVEY_QUESTION_TYPE = {
  SingleChoice: 'singleChoice',
  MultipleChoiceMember: 'multipleChoiceMember',
  ShortAnswer: 'shortAnswer',
} as const;

export type SurveyQuestionsType = (typeof SURVEY_QUESTION_TYPE)[keyof typeof SURVEY_QUESTION_TYPE];

export const SURVEY_QUESTION_CATEGORY = {
  Responsibility: 'responsibility',
  Initiative: 'initiative',
  ProblemSolving: 'problemSolving',
  Communication: 'communication',
  Teamwork: 'teamwork',
  Strength: 'strength',
  ImprovementPoint: 'improvementPoint',
} as const;

export type SurveyQuestionCategoryType =
  (typeof SURVEY_QUESTION_CATEGORY)[keyof typeof SURVEY_QUESTION_CATEGORY];

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
  teamMembers: string[] | undefined;
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

// Zod 스키마 정의
const surveyResponseSchema = z.object({
  score: z.number().int().min(1).max(5).optional(),
  choice: z.boolean().optional(),
  description: z.string().optional(),
  example: z.string().optional(),
});

const surveyResponseDetailsSchema = z.object({
  revieweeEmail: z.string().email(),
  response: surveyResponseSchema,
});

const surveyQuestionResponseSchema = z.object({
  questionOrder: z.string(),
  questionType: z.enum(['singleChoice', 'multipleChoiceMember', 'shortAnswer']),
  questionCategory: z.enum([
    'responsibility',
    'initiative',
    'problemSolving',
    'communication',
    'teamwork',
    'strength',
    'improvementPoint',
  ]),
  responseDetails: z.array(surveyResponseDetailsSchema).min(1),
});

export const surveyFormSchema = z.object({
  responses: z.array(surveyQuestionResponseSchema),
});

export type SurveyFormValues = z.infer<typeof surveyFormSchema>;
