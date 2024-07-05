import { useModalStore } from '@/stores/modalStore';

export function useModal() {
  const { modals, openModal, closeModal } = useModalStore();
  return { modals, openModal, closeModal };
}
