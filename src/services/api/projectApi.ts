import axios from 'axios';
import { ax } from '../axios';
import type {
  ProjectCreateRequest,
  ProjectCreateResponse,
  ProjectUpdateRequest,
  ProjectUpdateResponse,
  ProjectDeleteResponse,
  ProjectListResponse,
  ProjectDetailResponse,
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

// 내가 등록한 프로젝트 목록 가져오기
export const getRegisteredProjects = async (): Promise<ProjectListResponse> => {
  try {
    const response = await ax.get<ProjectListResponse>(`/api/v1/projects/me-registered-projects`);
    console.log('Get Registered Project Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `등록한 프로젝트 가져오기 실패: ${error.response?.data?.message || error.message}`,
      );
      console.error('Full error response:', error.response?.data);
      throw new Error(
        `등록한 프로젝트 가져오기 실패: ${error.response?.data?.message || error.message}`,
      );
    } else {
      console.error(`등록한 프로젝트 가져오기 실패: ${error}`);
      throw new Error(`등록한 프로젝트 가져오기 실패: ${error}`);
    }
  }
};

// 연동할 프로젝트 목록 가져오기
export const getLinkProjectsByProjectName = async (
  projectName: string,
): Promise<ProjectListResponse> => {
  try {
    const response = await ax.get<ProjectListResponse>('/api/v1/projects/summary/by-name', {
      params: { projectName },
    });

    console.log('Get Link Project Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `연동할 프로젝트 목록 가져오기 실패: ${error.response?.data?.message || error.message}`,
      );
      console.error('Full error response:', error.response?.data);
      throw new Error(
        `연동할 프로젝트 목록 가져오기 실패: ${error.response?.data?.message || error.message}`,
      );
    } else {
      console.error(`연동할 프로젝트 목록 가져오기 실패: ${error}`);
      throw new Error(`연동할 프로젝트 목록 가져오기 실패: ${error}`);
    }
  }
};

// 프로젝트 수정 시에 가져올 상세 값들 (Mutation)
// 따로 나온 게 없어 재사용 ..
export const getEditProjectDetails = async (projectId: number): Promise<ProjectDetailResponse> => {
  try {
    // 아래 2개의 api는 리턴값이 동일함..!
    // /api/v1/projects/me-involved-projects/{projectId}
    // /api/v1/projects/summary/detail/{projectId}
    const response = await ax.get<ProjectDetailResponse>(
      `/api/v1/projects/me-involved-projects/${projectId}`,
    );
    console.log('Get Project Details Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`프로젝트 상세 조회 실패: ${error.response?.data?.message || error.message}`);
      console.error('Full error response:', error.response?.data);
      throw new Error(`프로젝트 상세 조회 실패: ${error.response?.data?.message || error.message}`);
    } else {
      console.error(`프로젝트 상세 조회 실패: ${error}`);
      throw new Error(`프로젝트 상세 조회: ${error}`);
    }
  }
};
