import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { PRismReportResponse } from '@/models/prism/prismApiModels';
import { getPRismProjectUserReport, getPRismUserOverallReport } from '@/services/api/prismApi';

// 특정 프로젝트의 특정 유저에 대한 프리즘 분석 지표 가져오기
export const useGetPRismProjectUserReport = (userId: string, projectId: number) => {
  return useQuery<PRismReportResponse, AxiosError>({
    queryKey: ['getLinkProjectsByProjectName', userId, projectId],
    queryFn: () => getPRismProjectUserReport(userId, projectId),
    enabled: !!userId || !!projectId, // userId, projectId 중 하나라도 없는 경우엔 쿼리 미실행
  });
};

// 특정 유저의 전체 프로젝트 종합 프리즘 분석 지표 가져오기
export const usePRismUserOverallReport = (userId: string) => {
  return useQuery<PRismReportResponse, AxiosError>({
    queryKey: ['getPRismUserOverallReport', userId],
    queryFn: () => getPRismUserOverallReport(userId),
    enabled: !!userId, // userId가 없는 경우엔 쿼리 미실행
  });
};
