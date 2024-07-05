import { create } from 'zustand';

interface ModalState {
  modals: React.ReactNode[];
  openModal: (modal: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modals: [],
  openModal: (modal) => set((state) => ({ modals: [...state.modals, modal] })),
  closeModal: () => set((state) => ({ modals: state.modals.slice(0, -1) })),
}));
