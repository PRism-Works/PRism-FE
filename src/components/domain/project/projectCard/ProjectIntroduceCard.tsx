'use client';

import BorderCard from '@/components/common/card/BorderCard';
import { ArrowUpRight } from 'lucide-react';
import TagInput from '@/components/common/input/TagInput';
import ProjectVisibilityButton from '../projectButton/ProjectVisibilityButton';
import InformationTooltip from '@/components/common/tooltip/InformationTooltip';
import { useGetProfileProjectDetails } from '@/hooks/queries/useProjectService';
import { useUserStore } from '@/stores/userStore';
import { PageSpinner } from '@/components/common/spinner';
import { convertStringToDate, formatDateToDotSeparatedYYYYMMDD } from '@/lib/dateTime';
import { cn } from '@/lib/utils';
import ImageSaveButton from '@/components/common/input/ImageSaveButton';
import { SAVE_TYPE } from '@/models/preview/previewModels';

interface ProjectIntroduceCardProps {
  projectId: number;
  fromMyProfile: boolean; // true: 내 프로젝트 상세조회
  userId?: string;
  forSaveImage?: boolean;
}

// 프로젝트 개요
export default function ProjectIntroduceCard({
  projectId,
  fromMyProfile = false,
  userId = '',
  forSaveImage = false,
}: ProjectIntroduceCardProps) {
  // 프로젝트 정보 조회 api 호출
  const { data, isLoading, isError } = useGetProfileProjectDetails(fromMyProfile, projectId);
  const loginUser = useUserStore((state) => state.user);

  // 프로젝트 상세 조회 대상자가 누구인지 찾아야함. 대상 id가 없다면 return 처리
  const targetUserId = fromMyProfile ? loginUser?.userId : userId;
  if (!targetUserId) return <span>조회하려는 대상의 상세 프로젝트 정보가 없습니다.</span>;
  const projectData = data?.data;

  const isValidData = !(isLoading || isError || !projectData);

  const targetUserData = projectData?.members.find((member) => member.userId === targetUserId);
  const startDate = convertStringToDate(projectData?.startDate || '2024-07-24'); // 첫 렌더링 시 임시 값으로 설정
  const endDate = convertStringToDate(projectData?.endDate || '2024-07-24');

  return (
    <>
      {!isValidData ? (
        <div className="flex flex-col gap-4">
          <h2 className="text-gray-900 body6">프로젝트 개요</h2>
          <BorderCard className="h-[165px] w-full flex-col-center">
            {isLoading ? (
              <PageSpinner />
            ) : isError ? (
              <span className="text-gray-600 display6">
                프로젝트 정보를 로드하는 중 오류가 발생했습니다.
              </span>
            ) : (
              <span className="text-gray-600 display6">프로젝트 정보가 없습니다.</span>
            )}
          </BorderCard>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-10">
          <section className="flex-col-center">
            <h1 className="text-gray-900 body6">
              프로젝트
              <EmphasizeWord forSaveImage={forSaveImage} text={projectData.projectName} />
              에서
              <EmphasizeWord
                forSaveImage={forSaveImage}
                text={targetUserData?.roles.join(', ') || ''}
              />
              로 활동한 {targetUserData?.name}입니다.
            </h1>
          </section>
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-900 body6">프로젝트 개요</h2>
              {fromMyProfile && (
                <ImageSaveButton
                  saveType={SAVE_TYPE.PROJECT}
                  projectId={projectId}
                  className="-mb-4 mr-2"
                />
              )}
            </div>
            <BorderCard className="p-7">
              <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-7">
                {/* 프로젝트 기간 */}
                <div className="text-gray-600 display6">기간</div>
                <div className="text-black display4">
                  <time>{formatDateToDotSeparatedYYYYMMDD(startDate)}</time> -{' '}
                  <time>{formatDateToDotSeparatedYYYYMMDD(endDate)}</time>
                </div>

                {/* 타겟 유저의 해당 프로젝트에서 맡은 역할 */}
                <div className="text-gray-600 display6">역할</div>
                <ul className="flex items-center gap-1">
                  {targetUserData?.roles.map((role, index) => (
                    <li key={index}>
                      <TagInput
                        forSaveImage={forSaveImage}
                        isDisabled
                        colorTheme="indigo"
                        value={role}
                      />
                    </li>
                  ))}
                </ul>

                {/* 프로젝트 설명 */}
                <div className="text-gray-600 display6">상세 설명</div>
                <p className="text-black display4">{projectData.projectDescription || '-'}</p>

                <div className="text-purple-800 display6">링크 바로가기</div>
                <div className="flex items-center justify-between">
                  {/* 프로젝트 URL */}
                  <div className="flex-center">
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
                  {/* 마이페이지에서 넘어온 경우, 프로젝트 익명 여부 설정 */}
                  {fromMyProfile && (
                    <div className="space-x-2 flex-center">
                      <ProjectVisibilityButton
                        projectId={projectId}
                        initialVisibility={targetUserData?.anonyVisibility || false}
                      />
                      <InformationTooltip message="프로젝트 참여 비공개로 전환 시, 해당 프로젝트에 '익명'으로 표시돼요." />
                    </div>
                  )}
                </div>
              </div>
            </BorderCard>
          </section>
        </div>
      )}
    </>
  );
}

interface EmphasizeWordProps {
  text: string;
  forSaveImage: boolean;
}
const EmphasizeWord = ({ text, forSaveImage = false }: EmphasizeWordProps) => {
  // 이미지 저장 시, absolute 값 조정 필요
  return (
    <span
      className={cn(
        'relative mx-5 inline-block text-purple-700 body6',
        'before:absolute before:left-0 before:h-[1px] before:w-full before:bg-black before:content-[""]',
        'after:absolute after:right-[-5px] after:h-[5px] after:w-[5px] after:rounded-full after:bg-black',
        forSaveImage ? 'before:bottom-[-12px]' : 'before:bottom-0',
        forSaveImage ? 'after:bottom-[-13.5px]' : 'after:bottom-[-2.5px]',
      )}>
      {text}
    </span>
  );
};
