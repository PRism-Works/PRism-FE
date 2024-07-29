import TermsModalLayout from '@/components/common/modal/TermsModalLayout';

export default function SignupEmailConsentModal() {
  return (
    <TermsModalLayout title="[필수] 이메일 정보 수신 동의 ">
      <p className="mt-4 text-gray-800 mobile2">
        PRism의 서비스 관련 중요 정보, 공지 사항, 업데이트 등을 이메일로 받아 보시기 위해 이메일
        주소 제공에 동의해 주셔야 합니다. 이는 서비스 이용에 필수적이며, 동의 후 회원가입이
        가능합니다.
      </p>
    </TermsModalLayout>
  );
}
