import axios from 'axios';
import { ax } from '../axios';
import {
  UserDataResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UserProfileResponse,
} from '@/models/user/userApiModels';

// 로그인 한 사용자의 기본 데이터 가져오기 (로그인 시 호출)
export const userDataByLoginUser = async (): Promise<UserDataResponse> => {
  try {
    const response = await ax.get<UserDataResponse>('/api/v1/users/me');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `로그인 유저 데이터 가져오기 실패: ${error.response?.data?.message || error.message}`,
      );
      console.error('Full error response:', error.response?.data);
      throw new Error(
        `로그인 유저 데이터 가져오기 실패: ${error.response?.data?.message || error.message}`,
      );
    } else {
      console.error(`로그인 유저 데이터 가져오기 실패: ${error}`);
      throw new Error(`로그인 유저 데이터 가져오기 실패: ${error}`);
    }
  }
};

// 특정 사용자의 프로필 데이터 가져오기
export const userProfileDataByUserId = async (userId: string): Promise<UserProfileResponse> => {
  try {
    const response = await ax.get<UserProfileResponse>(`/api/v1/users/${userId}/profile`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`유저 프로필 가져오기 실패: ${error.response?.data?.message || error.message}`);
      console.error('Full error response:', error.response?.data);
      throw new Error(
        `유저 프로필 가져오기 실패: ${error.response?.data?.message || error.message}`,
      );
    } else {
      console.error(`유저 프로필 가져오기 실패: ${error}`);
      throw new Error(`유저 프로필 가져오기 실패: ${error}`);
    }
  }
};

export const updateProfile = async (data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
  try {
    const response = await ax.patch<UpdateProfileResponse>('/api/v1/users/profile', {
      ...data,
      introduction: data.introduction || '',
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error('프로필 수정 실패');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`프로필 수정 실패: ${error.response?.data?.message || error.message}`);
      console.error('Full error response:', error.response?.data);
      throw new Error(`프로필 수정 실패: ${error.response?.data?.message || error.message}`);
    } else {
      console.error(`프로필 수정 실패: ${error}`);
      throw new Error(`프로필 수정 실패: ${error}`);
    }
  }
};
