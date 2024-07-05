'use client';

import React from 'react';
import ConfirmModal from '@/components/modal/confirmModal/ConfirmModal';
import { useModalStore } from '@/stores/modalStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/input/PasswordInput';

export default function LoginModal() {
  const openModal = useModalStore((state) => state.openModal);
  const isSmallScreen = useMediaQuery('(max-width: 430px)');

  const handleOpen = () => {
    openModal(
      <ConfirmModal
        title="로그인"
        footer={
          <Button
            className={`mt-7 h-[55px] w-full max-w-[420px] rounded-[10px] bg-purple-200 px-[24px] py-[16px] text-white ${
              isSmallScreen ? 'body8' : 'body7'
            } hover:bg-purple-400`}>
            로그인
          </Button>
        }>
        <div className="mt-12 grid w-full max-w-[420px] items-center gap-1">
          <Label
            className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
            htmlFor="login-email">
            이메일 주소
          </Label>
          <Input type="email" id="login-email" placeholder="prism12@gmail.com" className="w-full" />
        </div>
        <div className="my-8 grid w-full max-w-[420px] items-center gap-1">
          <Label
            className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
            htmlFor="login-password">
            비밀번호
          </Label>
          <PasswordInput id="login-password" placeholder="비밀번호" className="w-full" />
        </div>
        <div className={`w-full max-w-[420px] ${isSmallScreen ? 'mobile2' : 'mobile1'}`}>
          <div className="flex items-center justify-between">
            <p className="ml-2 text-gray-800">아이디가 없으신가요?</p>
            <Button
              variant="link"
              className="w-full max-w-[100px] text-right text-info underline mobile1">
              회원가입하기
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <p className="-mt-2 ml-2 text-gray-400">비밀번호를 잊으셨나요?</p>
            <Button
              variant="link"
              className="-mt-2 w-full max-w-[100px] text-right text-gray-400 underline mobile1">
              비밀번호찾기
            </Button>
          </div>
        </div>
      </ConfirmModal>,
    );
  };

  return (
    <span className="cursor-pointer" onClick={handleOpen}>
      로그인
    </span>
  );
}
