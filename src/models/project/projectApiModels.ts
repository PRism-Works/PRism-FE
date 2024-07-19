interface CategoryResponse {
  id: number;
  category: {
    categoryId: number;
    name: string;
  };
}

interface CommonProjectFields {
  projectName: string;
  organizationName: string;
  startDate: string;
  endDate: string;
  memberCount: number;
  projectUrlLink: string;
  projectDescription: string;
  skills: string[];
}

export interface ProjectCreateRequest extends CommonProjectFields {
  members: {
    name: string;
    email: string;
    roles: string[];
  }[];
  categories: string[];
}

export interface ProjectCreateResponse {
  success: boolean;
  status: number;
  data: CommonProjectFields & {
    projectId: number;
    categories: CategoryResponse[];
  };
}

// 프로젝트 산출물의 공개, 비공개 여부 추가 필요
export interface ProjectUpdateRequest extends CommonProjectFields {
  members: {
    name: string;
    email: string;
    roles: string[];
  }[];
  categories: string[]; // id 배열로 바뀔 예정
}
export interface ProjectUpdateResponse {
  success: boolean;
  status: number;
  data: CommonProjectFields & {
    projectId: number;
    categories: CategoryResponse[];
  };
}

export interface ProjectDeleteResponse {
  success: boolean;
  status: number;
  data: null;
}
