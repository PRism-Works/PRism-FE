import axios from 'axios';
import { ax } from '../axios';
import {
  ProjectCreateRequest,
  ProjectCreateResponse,
  ProjectUpdateRequest,
  ProjectUpdateResponse,
  ProjectDeleteResponse,
} from '@/models/project/projectApiModels';

// 프로젝트 등록
export const createProject = async (data: ProjectCreateRequest): Promise<ProjectCreateResponse> => {
  try {
    const response = await ax.post<ProjectCreateResponse>('/api/v1/projects', data);
    console.log('Create Project Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`프로젝트 등록 실패: ${error.response?.data?.message || error.message}`);
      console.error('Full error response:', error.response?.data);
      throw new Error(`프로젝트 등록 실패: ${error.response?.data?.message || error.message}`);
    } else {
      console.error(`프로젝트 등록 실패: ${error}`);
      throw new Error(`프로젝트 등록 실패: ${error}`);
    }
  }
};

// 프로젝트 수정
export const updateProject = async (
  projectId: number,
  data: ProjectUpdateRequest,
): Promise<ProjectUpdateResponse> => {
  try {
    const response = await ax.put<ProjectUpdateResponse>(`/api/v1/projects/${projectId}`, data);
    console.log('Update Project Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`프로젝트 수정 실패: ${error.response?.data?.message || error.message}`);
      console.error('Full error response:', error.response?.data);
      throw new Error(`프로젝트 수정 실패: ${error.response?.data?.message || error.message}`);
    } else {
      console.error(`프로젝트 수정 실패: ${error}`);
      throw new Error(`프로젝트 수정 실패: ${error}`);
    }
  }
};

// 프로젝트 삭제
export const deleteProject = async (projectId: number): Promise<ProjectDeleteResponse> => {
  try {
    const response = await ax.delete<ProjectDeleteResponse>(`/api/v1/projects/${projectId}`);
    console.log('Delete Project Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`프로젝트 삭제 실패: ${error.response?.data?.message || error.message}`);
      console.error('Full error response:', error.response?.data);
      throw new Error(`프로젝트 삭제 실패: ${error.response?.data?.message || error.message}`);
    } else {
      console.error(`프로젝트 삭제 실패: ${error}`);
      throw new Error(`프로젝트 삭제 실패: ${error}`);
    }
  }
};
