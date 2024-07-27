import { ax } from '../axios';
import axios from 'axios';

import { PRismReportResponse } from '@/models/prism/prismApiModels';

// 특정 프로젝트의 특정 유저에 대한 프리즘 분석
export const getSingleProjectUserAnalysis = async (
  userId: string,
  projectId: number,
): Promise<PRismReportResponse> => {
  try {
    const response = await ax.get<PRismReportResponse>(`api/v1/prism/${userId}/${projectId}`);
    console.log('Get PRism Project User Report Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `특정 프로젝트의 특정 유저에 대한 프리즘 분석 조회 실패: ${error.response?.data?.message || error.message}`,
      );
      console.error('Full error response:', error.response?.data);
      throw new Error(
        `특정 프로젝트의 특정 유저에 대한 프리즘 분석 실패: ${error.response?.data?.message || error.message}`,
      );
    } else {
      console.error(`특정 프로젝트의 특정 유저에 대한 프리즘 분석 실패: ${error}`);
      throw new Error(`특정 프로젝트의 특정 유저에 대한 프리즘 분석 실패: ${error}`);
    }
  }
};

// 특정 유저의 전체 프로젝트 종합 프리즘 분석
export const getUserOverallProjectAnalysis = async (
  userId: string,
): Promise<PRismReportResponse> => {
  try {
    const response = await ax.get<PRismReportResponse>(`api/v1/prism/${userId}`);
    console.log('Get PRism Project User Report Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `특정 유저의 전체 프로젝트 종합 프리즘 분석 조회 실패: ${error.response?.data?.message || error.message}`,
      );
      console.error('Full error response:', error.response?.data);
      throw new Error(
        `특정 유저의 전체 프로젝트 종합 프리즘 분석 실패: ${error.response?.data?.message || error.message}`,
      );
    } else {
      console.error(`특정 유저의 전체 프로젝트 종합 프리즘 분석 실패: ${error}`);
      throw new Error(`특정 유저의 전체 프로젝트 종합 프리즘 분석 실패: ${error}`);
    }
  }
};
