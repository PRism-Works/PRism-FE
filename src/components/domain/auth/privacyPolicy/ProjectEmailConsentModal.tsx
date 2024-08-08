import TermsModalLayout from '@/components/common/modal/TermsModalLayout';

export default function ProjectEmailConsentModal() {
  return (
    <TermsModalLayout title="[필수] 이메일 주소 제공 동의 ">
      <p className="text-gray-800 mt-3 mobile2">
        귀하는 팀원들의 이메일 주소를 제공하기 전에, 팀원들로부터 이메일 수신에 대한 동의를 받았음을
        확인해야 합니다. 팀원들에게 PRism 평가지를 전송하기 위해 팀원들의 이메일 주소를 제공하시는
        경우, 아래 내용을 읽고 동의해 주세요.
      </p>
      <br />
      <ul className="text-gray-600 list-disc pl-6 display5">
        <li>제공된 이메일 주소는 PRism 평가지를 전송하는 데에만 사용됩니다.</li>
        <li>팀원들은 제공된 이메일을 통해 평가지 수신 및 참여를 요청받게 됩니다.</li>
        <li>팀원들에게 개인정보 보호에 대한 안내가 제공됩니다.</li>
      </ul>
    </TermsModalLayout>
  );
}
