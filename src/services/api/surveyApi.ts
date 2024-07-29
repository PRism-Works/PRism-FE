import axios, { AxiosError } from 'axios';
import { ax } from '../axios';
import type {
  SurveyLinkErrorResponse,
  SurveyLinkRequest,
  SurveyLinkResponse,
  SendSurveyLinkRequest,
  SendSurveyLinkResponse,
  SendSurveyLinkErrorResponse,
  SubmitSurveyRequest,
  SubmitSurveyResponse,
  SubmitSurveyErrorResponse,
} from '@/models/survey/surveyApiModels';

// 평가 링크로부터 정보 가져오기
export const fetchSurveyLink = async (params: SurveyLinkRequest): Promise<SurveyLinkResponse> => {
  try {
    const response = await ax.get<SurveyLinkResponse>('/api/v1/peer-reviews/link', {
      params,
    });
    console.log('Fetch Peer Review Link Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<SurveyLinkErrorResponse>;
      const errorResponse = axiosError.response?.data;

      console.error(`평가 링크 정보 가져오기 실패: ${errorResponse?.message || error.message}`);
      console.error('Full error response:', errorResponse);

      switch (errorResponse?.code) {
        case 'PeerReviewCode_404_1':
          throw new Error('평가 링크 코드를 찾을 수 없습니다.');
        case 'PeerReviewCode_400_1':
          throw new Error('이미 평가를 완료했습니다.');
        case 'PeerReviewCode_400_2':
          throw new Error('평가할 프로젝트 멤버가 없습니다.');
        default:
          throw new Error(
            `평가 링크 정보 가져오기 실패: ${errorResponse?.message || error.message}`,
          );
      }
    } else {
      console.error(`평가 링크 정보 가져오기 실패: ${error}`);
      throw new Error(`평가 링크 정보 가져오기 실패: ${error}`);
    }
  }
};

// 평가 링크 발송
export const sendSurveyLink = async (
  params: SendSurveyLinkRequest,
): Promise<SendSurveyLinkResponse> => {
  try {
    const response = await ax.post<SendSurveyLinkResponse>(
      '/api/v1/peer-reviews/link',
      {},
      {
        params: { projectId: params.projectId },
      },
    );
    console.log('Send Survey Link Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse: SendSurveyLinkErrorResponse = error.response?.data;
      console.error(`평가 링크 발송 실패: ${errorResponse.message || error.message}`);
      console.error('Full error response:', errorResponse);
      throw new Error(`평가 링크 발송 실패: ${errorResponse.message || error.message}`);
    } else {
      console.error(`평가 링크 발송 실패: ${error}`);
      throw new Error(`평가 링크 발송 실패: ${error}`);
    }
  }
};

// 평가 응답 제출
export const submitSurvey = async (
  projectId: number,
  data: SubmitSurveyRequest,
): Promise<SubmitSurveyResponse> => {
  try {
    const response = await ax.post<SubmitSurveyResponse>(
      `/api/v1/peer-reviews/projects/${projectId}`,
      data,
    );
    console.log('Submit Survey Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse: SubmitSurveyErrorResponse = error.response?.data;
      console.error(`평가 응답 제출 실패: ${errorResponse.reason || error.message}`);
      console.error('Full error response:', errorResponse);
      throw new Error(`평가 응답 제출 실패: ${errorResponse.reason || error.message}`);
    } else {
      console.error(`평가 응답 제출 실패: ${error}`);
      throw new Error(`평가 응답 제출 실패: ${error}`);
    }
  }
};
