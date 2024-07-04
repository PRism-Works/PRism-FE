'use client';

import { useModalStore } from '@/stores/modalStore';

export default function ModalPortal() {
  const modals = useModalStore((state) => state.modals);
  return <>{modals}</>;
}
