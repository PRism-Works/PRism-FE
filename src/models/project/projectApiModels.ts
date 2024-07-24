// 서버에서 받아오는 카테고리 리스트 데이터 형식
interface CategoryResponse {
  id: number;
  category: {
    categoryId: number;
    name: string;
  };
}

// 프로젝트 등록 요청
export interface ProjectCreateRequest {
  projectName: string;
  organizationName: string;
  startDate: string;
  endDate: string;
  memberCount: number;
  projectUrlLink: string;
  projectDescription: string;
  skills: string[];

  categories: string[];
  members: {
    name: string;
    email: string;
    roles: string[];
  }[];
}

export interface ProjectCreateResponse {
  success: boolean;
  status: number;
  data: {
    projectId: number;

    projectName: string;
    organizationName: string;

    memberCount: number;
    projectDescription: string;
    skills: string[];

    categories: CategoryResponse[];

    startDate: string;
    endDate: string;

    projectUrlLink: string;
    urlVisibility: boolean;
    createdBy: string | null;
  };
}

// 프로젝트 수정
// 프로젝트 산출물의 공개, 비공개 여부 추가 필요
export interface ProjectUpdateRequest {
  projectName: string;
  projectDescription: string;
  organizationName: string;
  memberCount: number;
  categories: string[];
  skills: string[];

  startDate: string;
  endDate: string;

  projectUrlLink: string;
  // urlVisibility: boolean;

  members: {
    name: string;
    email: string;
    roles: string[];
    anonyVisibility: boolean; // 조회 시 받은 데이터 그대로 돌려줘야할듯
  }[];
}
export interface ProjectUpdateResponse {
  success: boolean;
  status: number;
  data: {
    projectId: number;
    projectName: string;
    projectDescription: string;
    organizationName: string;
    memberCount: number;
    categories: CategoryResponse[];
    skills: string[];

    startDate: string;
    endDate: string;
    projectUrlLink: string;
    // urlVisibility: boolean;
    createdBy: string | null;
  };
}

// 프로젝트 삭제
export interface ProjectDeleteResponse {
  success: boolean;
  status: number;
  data: null;
}

// 프로젝트 리스트 받아올 때 Response 형태
// 내가 참여한 프로젝트 리스트, 내가 등록한 프로젝트 리스트, 연동할 프로젝트 리스트, 타인이 참여한 프로젝트 리스트
export interface ProjectListResponse {
  success: boolean;
  status: number;
  data: {
    projectId: number;

    projectName: string;
    organizationName: string;
    startDate: string;
    endDate: string;

    categories: string[];

    urlVisibility: boolean;
    userEvaluation: string;
    surveyParcitipants: number;
  }[];
}

// 프로젝트 상세 조회
// 검색 상세조회, 프로젝트 수정 시 상세조회, 타인 프로젝트 상세조회 때 마다 재사용
export interface ProjectDetailResponse {
  success: boolean;
  status: number;
  data: {
    projectName: string;
    organizationName: string;
    startDate: string;
    endDate: string;

    projectUrlLink: string;
    urlVisibility: boolean;

    projectDescription: string;
    categories: string[];
    skills: string[];
    members: {
      userId: string;
      name: string;
      email: string;
      roles: string[];
      anonyVisibility: boolean;
    }[];
    anonymousCount: number;
  };
}
