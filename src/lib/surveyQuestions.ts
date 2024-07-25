export const SURVEY_QUESTION_TYPE = {
  Radio: 'Radio',
  Check: 'Check',
  Text: 'Text',
} as const;

type surveyQuestionsType = (typeof SURVEY_QUESTION_TYPE)[keyof typeof SURVEY_QUESTION_TYPE];

interface Question {
  id: number;
  type: surveyQuestionsType;
  text: string;
}

export const surveyQuestions: Question[] = [
  {
    id: 1,
    type: SURVEY_QUESTION_TYPE.Radio,
    text: '다른 팀원의 의견을 경청하고 이해하려고 노력했나요?',
  },
  { id: 2, type: SURVEY_QUESTION_TYPE.Radio, text: '정보나 자료를 효과적으로 공유했나요?' },
  { id: 3, type: SURVEY_QUESTION_TYPE.Radio, text: '자신의 의견을 논리적으로 피력했나요?' },
  {
    id: 4,
    type: SURVEY_QUESTION_TYPE.Radio,
    text: '자발적으로 새로운 아이디어나 해결책을 제안했나요?',
  },
  {
    id: 5,
    type: SURVEY_QUESTION_TYPE.Radio,
    text: '어려운 과제나 추가적인 업무를 기꺼이 맡아서 했나요?',
  },
  {
    id: 6,
    type: SURVEY_QUESTION_TYPE.Radio,
    text: '팀원들과 협력하여 문제상황 혹은 갈등을 해결하는 데 적극적이었나요?',
  },
  {
    id: 7,
    type: SURVEY_QUESTION_TYPE.Check,
    text: '갈등 상황 혹은 문제 상황이 발생했을 때 기여도가 높은 팀원을 골라주세요. (중복 선택 가능)',
  },
  { id: 8, type: SURVEY_QUESTION_TYPE.Radio, text: '할당된 업무를 기한 내에 완료했나요?' },
  { id: 9, type: SURVEY_QUESTION_TYPE.Radio, text: '팀 일정에 성실히 참석했나요?' },
  { id: 10, type: SURVEY_QUESTION_TYPE.Radio, text: '맡은 업무를 성실하게 했나요?' },
  {
    id: 11,
    type: SURVEY_QUESTION_TYPE.Radio,
    text: '다른 팀원들의 업무를 지원하거나 도와주었나요?',
  },
  { id: 12, type: SURVEY_QUESTION_TYPE.Radio, text: '팀 내 역할 분담을 원활하게 조율했나요?' },
  {
    id: 13,
    type: SURVEY_QUESTION_TYPE.Text,
    text: '각 팀원들의 가장 큰 강점은 무엇이고, 왜 그렇게 생각했나요?',
  },
  {
    id: 14,
    type: SURVEY_QUESTION_TYPE.Text,
    text: '각 팀원들이 향후 성장했으면 하는 부분은 무엇이고, 왜 그렇게 생각했나요?',
  },
];
