import TermsModalLayout from '@/components/common/modal/TermsModalLayout';

export default function SignupPrivacyPolicyModal() {
  return (
    <TermsModalLayout title="[필수] 이메일 주소 제공 동의 ">
      <p className="text-gray-800 mt-2 mobile2">
        PRism은 회원님의 개인정보를 안전하게 보호하기 위해 최선을 다하고 있습니다. 회원가입을 위해
        아래의 개인정보 처리 방침에 동의해 주세요.
      </p>
      <br />
      <ol className="text-gray-600 list-decimal pl-6 display5">
        <li>
          수집하는 개인정보: 이름, 이메일 주소, 비밀번호 등 회원가입 및 서비스 이용에 필요한 정보
        </li>
        <li>
          개인정보 수집 및 이용 목적: 회원관리, 서비스 제공, 고객 지원, 서비스 개선, 서비스 관련
          중요 정보 및 공지 사항 발송
        </li>
        <li>개인정보 보관 및 이용 기간: 회원 탈퇴 시까지 또는 법령에 따른 보존 기간 동안 보관</li>
        <li>개인정보 보호를 위한 조치: 데이터 암호화, 접근 통제 등</li>
      </ol>
      <br />
      <p className="mt-4 display6">[필수] 이용약관 동의</p>
      <p className="text-gray-800 mt-6 mobile2">
        PRism의 서비스 이용을 위해 아래의 이용약관에 동의해 주세요.
      </p>
      <br />
      <ol className="text-gray-600 mb-2 list-decimal pl-6 display5">
        <li>서비스 제공 및 변경: PRism이 제공하는 서비스의 내용과 변경 사항</li>
        <li>회원의 권리와 의무: 서비스 이용 시 회원의 권리와 의무</li>
        <li>회사의 권리와 의무: 서비스 제공 시 회사의 권리와 의무</li>
        <li>서비스 중단 및 종료: 서비스 중단 또는 종료 시의 절차 및 조건</li>
        <li>책임의 한계: 서비스 이용과 관련된 회사의 책임 한계</li>
      </ol>
    </TermsModalLayout>
  );
}
