import axios from 'axios';
import { ax } from '../axios';
import qs from 'qs';

import type {
  ProjectCreateRequest,
  ProjectCreateResponse,
  ProjectUpdateRequest,
  ProjectUpdateResponse,
  ProjectDeleteResponse,
  ProjectListResponse,
  ProjectDetailResponse,
  MyProjectVisibilityResponse,
  ProjectSearchRequest,
  ProjectSearchResponse,
  MyProjectVisibilityRequest,
  LinkProjectRequest,
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

// 연동할 프로젝트 리스트 이름으로 가져오기
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

// 내가 등록한 프로젝트 리스트 가져오기 (프로젝트 관리에서 사용)
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

// 내가 포함된 프로젝트 리스트 가져오기 (마이 프로필 프로젝트 목록)
export const getMeInvolvedProjects = async (): Promise<ProjectListResponse> => {
  try {
    const response = await ax.get<ProjectListResponse>('/api/v1/projects/me-involved-projects');
    console.log('Get MeInvolved Project List Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `내가 포함된 프로젝트 리스트 조회 실패: ${error.response?.data?.message || error.message}`,
      );
      console.error('Full error response:', error.response?.data);
      throw new Error(
        `내가 포함된 프로젝트 리스트 조회 실패: ${error.response?.data?.message || error.message}`,
      );
    } else {
      console.error(`내가 포함된 프로젝트 리스트 조회 실패: ${error}`);
      throw new Error(`내가 포함된 프로젝트 리스트 조회: ${error}`);
    }
  }
};

// 타인이 포함된 프로젝트 리스트 가져오기 (타인 프로필 프로젝트 목록)
export const getWhoInvolvedProjects = async (userId: string): Promise<ProjectListResponse> => {
  try {
    const response = await ax.get<ProjectListResponse>('/api/v1/projects/who-involved-projects', {
      params: { userId },
    });
    console.log('Get Who Invorved List Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `타인이 포함된 프로젝트 리스트 조회 실패: ${error.response?.data?.message || error.message}`,
      );
      console.error('Full error response:', error.response?.data);
      throw new Error(
        `타인이 포함된 프로젝트 리스트 조회 실패: ${error.response?.data?.message || error.message}`,
      );
    } else {
      console.error(`타인이 포함된 프로젝트 리스트 조회 실패: ${error}`);
      throw new Error(`타인이 포함된 프로젝트 리스트 조회: ${error}`);
    }
  }
};

// 프로젝트 수정 시에 가져올 프로젝트 상세조회
export const getEditProjectDetails = async (projectId: number): Promise<ProjectDetailResponse> => {
  try {
    // 프로젝트 수정 전용 api가 없어서 me-involved 호출
    const response = await ax.get<ProjectDetailResponse>(
      `/api/v1/projects/me-involved-projects/${projectId}`,
    );
    console.log('Get Edit Project Details Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `프로젝트 수정 상세 조회 실패: ${error.response?.data?.message || error.message}`,
      );
      console.error('Full error response:', error.response?.data);
      throw new Error(
        `프로젝트 수정 상세 조회 실패: ${error.response?.data?.message || error.message}`,
      );
    } else {
      console.error(`프로젝트 수정 상세 조회 실패: ${error}`);
      throw new Error(`프로젝트 수정 상세 조회: ${error}`);
    }
  }
};

// 내가 포함된 프로젝트 상세 조회 (마이페이지에서 접속)
export const getMyProjectDetails = async (projectId: number): Promise<ProjectDetailResponse> => {
  try {
    const response = await ax.get<ProjectDetailResponse>(
      `/api/v1/projects/me-involved-projects/${projectId}`,
    );
    console.log('Get My Project Details Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `내 프로젝트 상세 조회 실패: ${error.response?.data?.message || error.message}`,
      );
      console.error('Full error response:', error.response?.data);
      throw new Error(
        `내 프로젝트 상세 조회 실패: ${error.response?.data?.message || error.message}`,
      );
    } else {
      console.error(`내 프로젝트 상세 조회 실패: ${error}`);
      throw new Error(`내 프로젝트 상세 조회 실패: ${error}`);
    }
  }
};

// 타인의 프로젝트 (타인 프로필에서 접속), 검색 결과 프로젝트 상세 조회
export const getProjectDetails = async (projectId: number): Promise<ProjectDetailResponse> => {
  try {
    const response = await ax.get<ProjectDetailResponse>(
      `/api/v1/projects/summary/detail/${projectId}`,
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
      throw new Error(`프로젝트 상세 조회 실패: ${error}`);
    }
  }
};

// 특정 프로젝트에서 본인의 익명 처리 여부 설정 (공개/비공개)
export const updateMyProjectVisibility = async (
  data: MyProjectVisibilityRequest,
): Promise<MyProjectVisibilityResponse> => {
  try {
    const response = await ax.put<MyProjectVisibilityResponse>(`/api/v1/projects/anonyVisibility`, {
      projectId: data.projectId,
      anonyVisibility: data.visibility,
    });
    console.log('Update My Project Visibility Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `내 프로젝트 공개 여부 수정 실패: ${error.response?.data?.message || error.message}`,
      );
      console.error('Full error response:', error.response?.data);
      throw new Error(
        `내 프로젝트 공개 여부 수정 실패: ${error.response?.data?.message || error.message}`,
      );
    } else {
      console.error(`내 프로젝트 공개 여부 수정 실패: ${error}`);
      throw new Error(`내 프로젝트 공개 여부 수정 실패: ${error}`);
    }
  }
};

// 프로젝트 연동하기
export const linkProject = async (data: LinkProjectRequest): Promise<ProjectDetailResponse> => {
  try {
    const response = await ax.post<ProjectDetailResponse>(
      `/api/v1/projects/link-project/${data.projectId}`,
      {},
      {
        params: { anonymousEmail: data.anonymousEmail },
      },
    );
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

// 프로젝트 검색하기
export const getSearchProjects = async (
  searchCondition: ProjectSearchRequest,
): Promise<ProjectSearchResponse> => {
  try {
    const response = await ax.get<ProjectSearchResponse>('/api/v1/search/projects', {
      params: searchCondition,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    });
    console.log('Get Search Projects Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`프로젝트 검색 실패: ${error.response?.data?.message || error.message}`);
      console.error('Full error response:', error.response?.data);
      throw new Error(`프로젝트 검색 실패: ${error.response?.data?.message || error.message}`);
    } else {
      console.error(`프로젝트 검색 실패: ${error}`);
      throw new Error(`프로젝트 검색 실패: ${error}`);
    }
  }
};
