'use client';

import { useModalStore } from '@/stores/modalStore';

export default function ModalPortal() {
  const modals = useModalStore((state) => state.modals);
  // modal이 여러개인 경우, key 지정 필수

  return (
    <>
      {modals.map((modal, index) => (
        <div key={index}>{modal}</div>
      ))}
    </>
  );
}
