'use client';

import { Button } from '@/components/ui/button';
import LoginButton from '@/components/domain/auth/login/LoginButton';
import SignupButton from '@/components/domain/auth/signup/SignupButton';

export default function BeforeLoginMenu() {
  return (
    <>
      <LoginButton>
        <Button variant="outline" className="border-1 text-gray-700 mx-2 border border-gray-700">
          로그인
        </Button>
      </LoginButton>
      <SignupButton>
        <Button className="bg-purple-500 hover:bg-purple-600">회원가입</Button>
      </SignupButton>
    </>
  );
}
