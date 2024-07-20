import { useMutation, useQuery } from '@tanstack/react-query';
import { updateProfile, userData, getUserProfile } from '@/services/api/userApi';
import {
  UpdateProfileRequest,
  UpdateProfileResponse,
  UserDataResponse,
  UserProfileResponse,
} from '@/models/user/userApiModels';
import { AxiosError } from 'axios';

export const useUserData = () => {
  return useQuery<UserDataResponse, AxiosError>({
    queryKey: ['userData'],
    queryFn: userData,
    retry: false,
  });
};

export const useUserProfile = (userId: string) => {
  return useQuery<UserProfileResponse, AxiosError>({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
    retry: false,
  });
};

export const useUpdateProfile = () => {
  return useMutation<UpdateProfileResponse, AxiosError, UpdateProfileRequest>({
    mutationFn: updateProfile,
    onSuccess: () => {
      alert('프로필이 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      console.error('프로필 수정 실패:', error);
      alert('프로필 수정에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
