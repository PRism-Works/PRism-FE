import axios from 'axios';
import { ax } from '../axios';
import {
  UserDataResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@/models/user/userApiModels';

export const userData = async (): Promise<UserDataResponse> => {
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

export const updateProfile = async (data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
  try {
    const response = await ax.put<UpdateProfileResponse>('/api/v1/users/profile', data);
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
