import { User } from '@/models/user/userModels';
import { create } from 'zustand';

interface UserStoreType {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

// 유저 데이터 정보 저장 스토어
export const useUserStore = create<UserStoreType>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));
