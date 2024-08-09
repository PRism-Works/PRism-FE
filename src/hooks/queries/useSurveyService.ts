import { AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchSurveyLink, sendSurveyLink, submitSurvey } from '@/services/api/surveyApi';
import type {
  SurveyLinkRequest,
  SurveyLinkResponse,
  SurveyLinkErrorResponse,
  SendSurveyLinkRequest,
  SendSurveyLinkResponse,
  SubmitSurveyRequest,
  SubmitSurveyResponse,
} from '@/models/survey/surveyApiModels';
import useErrorMessageBox from '../useErrorMessageBox';

// 설문 링크 가져오기
export const useFetchSurveyLink = (params: SurveyLinkRequest) => {
  console.log('Fetching survey link with params:', params);
  return useQuery<SurveyLinkResponse, AxiosError<SurveyLinkErrorResponse>>({
    queryKey: ['fetchSurveyLink', params],
    queryFn: () => (params.code ? fetchSurveyLink(params) : Promise.reject('No code provided')),
    enabled: !!params.code,
  });
};

// 설문 링크 보내기
export const useSendSurveyLink = () => {
  const { showErrorMessageBox } = useErrorMessageBox();

  return useMutation<SendSurveyLinkResponse, AxiosError, SendSurveyLinkRequest>({
    mutationFn: sendSurveyLink,
    onError: (error) => {
      console.error('Send Survey Link Error:', error);
      showErrorMessageBox('평가 링크 발송에 실패했습니다.');
    },
  });
};

// 설문 응답 제출하기
export const useSubmitSurvey = (successCallback: () => void) => {
  const { showErrorMessageBox } = useErrorMessageBox();

  return useMutation<
    SubmitSurveyResponse,
    AxiosError,
    { projectId: number; data: SubmitSurveyRequest }
  >({
    mutationFn: ({ projectId, data }) => submitSurvey(projectId, data),
    onSuccess: (response) => {
      console.log('Submit Survey Response:', response);
      if (successCallback) successCallback();
    },
    onError: (error) => {
      console.error('Submit Survey Error:', error);
      showErrorMessageBox('평가 제출에 실패했습니다.');
    },
  });
};
