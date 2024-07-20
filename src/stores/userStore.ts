import { create } from 'zustand';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';

const USER_STORE_NAME = 'user-state';

import { User } from '@/models/user/userModels';
interface UserStoreType {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

// 유저 데이터 정보 저장 스토어
export const useUserStore = create<UserStoreType>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user: User) => set({ user }),
        clearUser: () => {
          set({ user: null });
          localStorage.removeItem('user-state');
        },
      }),
      {
        name: USER_STORE_NAME,
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
