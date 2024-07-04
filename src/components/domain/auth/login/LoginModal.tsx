'use client';

import React from 'react';
import ConfirmModal from '@/components/modal/confirmModal/ConfirmModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useModalStore } from '@/stores/modalStore';

export default function LoginModal() {
  const openModal = useModalStore((state) => state.openModal);

  const handleOpen = () => {
    openModal(
      <ConfirmModal title="로그인">
        <div className="mt-16 grid w-full max-w-sm items-center gap-1">
          <Label className="text-black body6" htmlFor="email">
            이메일 주소
          </Label>
          <Input type="email" id="email" placeholder="prism12@gmail.com" className="w-[420px]" />
        </div>
        <div className="my-10 grid w-full max-w-sm items-center gap-1">
          <Label className="text-black body6" htmlFor="password">
            비밀번호
          </Label>
          <Input type="password" id="password" placeholder="비밀번호" className="w-[420px]" />
        </div>
        <div className="display1">
          <div className="mb-2 flex items-center justify-between">
            <p>아이디가 없으신가요?</p>
            <div className="text-info">회원가입하기</div>
          </div>
          <div className="flex items-center justify-between">
            <p>비밀번호를 잊으셨나요?</p>
            <div>비밀번호찾기</div>
          </div>
        </div>
        <Button className="mt-7 h-[64px] w-[420px] rounded-[10px] bg-[#DCBDFF] px-[24px] py-[16px] text-white body1 hover:bg-purple-500">
          로그인
        </Button>
      </ConfirmModal>,
    );
  };

  return (
    <span className="cursor-pointer" onClick={handleOpen}>
      로그인
    </span>
  );
}
