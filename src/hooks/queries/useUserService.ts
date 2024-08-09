import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userProfileDataByUserId, updateProfile } from '@/services/api/userApi';
import {
  UpdateProfileRequest,
  UpdateProfileResponse,
  UserProfileResponse,
} from '@/models/user/userApiModels';
import { AxiosError } from 'axios';
import { User } from '@/models/user/userModels';
import { useUserStore } from '@/stores/userStore';
import useErrorMessageBox from '../useErrorMessageBox';

// userId로 특정 사용자의 Profile Data 가져오기
export const useUserProfileByUserId = (userId: string) => {
  return useQuery<UserProfileResponse, AxiosError>({
    queryKey: ['userProfileByUserId', userId],
    queryFn: () => userProfileDataByUserId(userId),
    retry: false,
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
  });
};

// 로그인 한 사용자의 프로필 수정하기
export const useUpdateProfile = (successCallback: () => void) => {
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore();
  const { showErrorMessageBox } = useErrorMessageBox();

  return useMutation<UpdateProfileResponse, AxiosError, UpdateProfileRequest>({
    mutationFn: updateProfile,
    onSuccess: (_, requestProfileData) => {
      if (successCallback) successCallback();

      // 저장 성공 시, zustand의 전역 상태 업데이트 해주기
      const userNewData: User = {
        userId: user?.userId || '',
        email: user?.email || '',
        name: requestProfileData?.username || '',
        roles: requestProfileData?.interestJobs || [],
        skills: requestProfileData?.skills || [],
      };
      setUser(userNewData);

      // 쿼리 무효화
      if (user?.userId) {
        queryClient.invalidateQueries({ queryKey: ['userProfileByUserId', user.userId] });
      }
    },
    onError: (error) => {
      console.error('프로필 수정 실패:', error);
      showErrorMessageBox('프로필 수정에 실패했습니다.');
    },
  });
};
