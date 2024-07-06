import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ModalState {
  modals: React.ReactNode[];
  openModal: (modal: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()(
  devtools((set) => ({
    modals: [],
    openModal: (modal) => set((state) => ({ modals: [...state.modals, modal] })),
    closeModal: () => set((state) => ({ modals: state.modals.slice(0, -1) })),
  })),
);
