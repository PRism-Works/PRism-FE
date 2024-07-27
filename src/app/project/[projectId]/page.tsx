'use client';

// 검색 결과에서 넘어온 프로젝트 상세 조회 페이지
import BorderCard from '@/components/common/card/BorderCard';
import TagInput from '@/components/common/input/TagInput';
import { ComponentSpinner } from '@/components/common/spinner';
import UserSummaryCard from '@/components/domain/user/UserSummaryCard';
import { useGetProfileProjectDetails } from '@/hooks/queries/useProjectService';
import { convertStringToDate, formatDateToDotSeparatedYYYYMMDD } from '@/lib/dateTime';
import { USER_CARD_VARIANT } from '@/models/user/userModels';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface SearchProjectDetailPageProps {
  params: { projectId: string };
}

export default function SearchProjectDetailPage({ params }: SearchProjectDetailPageProps) {
  const projectId = Number(params.projectId);
  const { data, isLoading, isError } = useGetProfileProjectDetails(false, projectId);

  const projectData = data?.data;
  const isValidData = !(isLoading || isError || !projectData);

  const startDate = convertStringToDate(projectData?.startDate || '2024-07-24'); // 첫 렌더링 시 임시 값으로 설정
  const endDate = convertStringToDate(projectData?.endDate || '2024-07-24');

  const memberList =
    projectData?.members?.map((member) => ({
      ...member,
      type:
        member.userId === '-1'
          ? USER_CARD_VARIANT.NON_MEMBER
          : !member.anonyVisibility
            ? USER_CARD_VARIANT.MEMBER_PRIVATE
            : USER_CARD_VARIANT.MEMBER_PUBLIC,
    })) || [];

  const renderInvalidText = () => (
    <span className="text-gray-600 display6 flex-center">
      {isLoading ? (
        <ComponentSpinner />
      ) : isError ? (
        '프로젝트를 로드하는 중 오류가 발생했습니다.'
      ) : (
        '프로젝트 정보가 없습니다.'
      )}
    </span>
  );

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-12">
      <div className="flex w-full max-w-[1040px] flex-col gap-10">
        <section className="flex flex-col gap-4">
          <h2 className="text-gray-900 body6">프로젝트 정보</h2>
          <BorderCard className="flex flex-col justify-center gap-7 p-7">
            {!isValidData ? (
              renderInvalidText()
            ) : (
              <>
                <h3 className="flex flex-col gap-1">
                  <div className="text-gray-500 caption">
                    {projectData.mostCommonTraits ? (
                      <>
                        <span className="text-purple-500 mobile2">
                          {projectData.mostCommonTraits}
                        </span>
                        이 높은 팀원이 많은 팀의 프로젝트에요!
                      </>
                    ) : (
                      '팀원들의 주요 특성을 분석중이에요!'
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700 body7">{projectData.projectName}</span>
                    {projectData.projectUrlLink && (
                      <span className="gap-1 text-gray-500 caption flex-center">
                        <CheckCircle2 className="h-4 w-4 fill-success-50 stroke-success-500" />
                        인증완료!
                      </span>
                    )}
                  </div>
                </h3>
                <div className="grid grid-cols-[90px_1fr] gap-x-8 gap-y-7">
                  <div className="text-purple-800 display6">링크 바로가기</div>
                  <div className="flex items-center">
                    {projectData.urlVisibility && projectData.projectUrlLink ? (
                      <>
                        <a
                          href={projectData.projectUrlLink}
                          className="text-gray-500 underline underline-offset-4">
                          {projectData.projectUrlLink}
                        </a>
                        <ArrowUpRight className="h-6 w-6 stroke-gray-500" />
                      </>
                    ) : (
                      '-'
                    )}
                  </div>
                  <div className="text-gray-600 display6">기관명</div>
                  <div className="text-black display4">{projectData.organizationName}</div>
                  <div className="text-gray-600 display6">기간</div>
                  <div className="text-black display4">
                    <time>{formatDateToDotSeparatedYYYYMMDD(startDate)}</time> -{' '}
                    <time>{formatDateToDotSeparatedYYYYMMDD(endDate)}</time>
                  </div>
                </div>
              </>
            )}
          </BorderCard>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-gray-900 body6">프로젝트 산출물 정보</h2>
          <BorderCard className="p-7">
            {!isValidData ? (
              renderInvalidText()
            ) : (
              <div className="grid grid-cols-[90px_1fr] gap-x-8 gap-y-7">
                <div className="text-gray-600 display6">상세 설명</div>
                <p className="text-black display4">{projectData.projectDescription || '-'}</p>
                <div className="text-gray-600 display6">카테고리</div>
                <ul className="flex gap-2">
                  {projectData.categories.length === 0
                    ? '-'
                    : projectData.categories.map((category, index) => (
                        <li key={index}>
                          <TagInput value={category} isDisabled />
                        </li>
                      ))}
                </ul>
                <div className="text-gray-600 display6">기술스택</div>
                <ul className="flex flex-wrap gap-2">
                  {projectData.skills.length === 0
                    ? '-'
                    : projectData.skills.map((skill, index) => (
                        <li key={index}>
                          <TagInput value={skill} isDisabled colorTheme="gray" />
                        </li>
                      ))}
                </ul>
              </div>
            )}
          </BorderCard>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-gray-900 body6">팀원 정보</h2>
          {!isValidData ? (
            <BorderCard>{renderInvalidText()}</BorderCard>
          ) : (
            <ul className="flex flex-wrap gap-4">
              {
                /* member의 명확한 식별자가 없어서 key는 index로 사용 */
                memberList.map((member, index) => (
                  <li key={index}>
                    <UserSummaryCard userData={member} variant={member.type} iconIndex={index} />
                  </li>
                ))
              }
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
