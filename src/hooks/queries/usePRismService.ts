import { AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

import type {
  PRismEvaluationUpdateResponse,
  PRismReportResponse,
} from '@/models/prism/prismApiModels';
import {
  getSingleProjectUserAnalysis,
  getUserOverallProjectAnalysis,
  updatePrismEvaluation,
} from '@/services/api/prismApi';

// 특정 프로젝트의 특정 유저에 대한 프리즘 분석 지표 가져오기
export const useSingleProjectUserAnalysis = (userId: string, projectId: number) => {
  return useQuery<PRismReportResponse, AxiosError>({
    queryKey: ['getSingleProjectUserAnalysis', userId, projectId],
    queryFn: () => getSingleProjectUserAnalysis(userId, projectId),
    enabled: !!userId || !!projectId, // userId, projectId 중 하나라도 없는 경우엔 쿼리 미실행
  });
};

// 특정 유저의 전체 프로젝트 종합 프리즘 분석 지표 가져오기
export const useUserOverallProjectAnalysis = (userId: string) => {
  return useQuery<PRismReportResponse, AxiosError>({
    queryKey: ['getUserOverallProjectAnalysis', userId],
    queryFn: () => getUserOverallProjectAnalysis(userId),
    enabled: !!userId, // userId가 없는 경우엔 쿼리 미실행
  });
};

// 프리즘 평가 갱신하기
export const useUpdatePRismEvaluation = (successCallback: () => void) => {
  return useMutation<PRismEvaluationUpdateResponse, AxiosError, number>({
    mutationFn: updatePrismEvaluation,
    onSuccess: (response) => {
      console.log(response);
      if (successCallback) successCallback();
    },
    onError: (error) => {
      // 추후 케이스 나눠서 메시징 처리 예정
      // 1번. 평가 갱신할 권한이 없을 경우(project owner가 아닐경우)
      // code: PeerReviewCode_400_3,
      // reason: 평가 갱신을 할 권한이 없습니다.

      // // 2번. ai등 평가 결과를 갱신에 실패할 경우
      // code: PeerReviewCode_400_4,
      // reason: 평가 갱신에 실패했습니다.

      // // 3번. 평가를 한 사람이 더이상 없는데 갱신을 할 경우
      // code: PeerReviewCode_400_5,
      // reason: 이미 평가 갱신이 완료되었습니다

      alert('PRism 분석 갱신에 실패했습니다.');
      console.log(error);
    },
  });
};
