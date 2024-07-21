'use client';

import { useEffect, useState } from 'react';
import { useModalStore } from '@/stores/modalStore';
import { useUserProfileByUserId, useUpdateProfile } from '@/hooks/queries/useUserService';
import { TechStacks, UserRoles } from '@/lib/tagList';
import { PageSpinner } from '@/components/common/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SelectTagModalLayout from '@/components/common/modal/SelectTagModalLayout';
import TagInput from '@/components/common/input/TagInput';
import { useUserStore } from '@/stores/userStore';
import MoveBackButton from '@/components/common/button/MoveBackButton';
import BorderCard from '@/components/common/card/BorderCard';

// 로그인 한 사용자의 프로필 수정 페이지
export default function EditMyPage() {
  const userId = useUserStore((state) => state.user?.userId);

  const { data: user, isLoading, isError, error } = useUserProfileByUserId(userId || '');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interestJobs, setInterestJobs] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const openModal = useModalStore((state) => state.openModal);
  const updateProfileMutation = useUpdateProfile();

  useEffect(() => {
    if (user?.data) {
      setName(user.data.username);
      setEmail(user.data.email);
      setInterestJobs(user.data.interestJobs || []);
      setSkills(user.data.skills || []);
    }
  }, [user]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleOpenSelectInterestJobsModal = () => {
    openModal(
      <SelectTagModalLayout
        title="관심 직무 검색"
        colorTheme="gray"
        placeholder="관심 직무를 선택해 주세요."
        tagList={UserRoles}
        defaultSelectTagList={interestJobs}
        onSelectComplete={handleInterestJobsSelectComplete}
      />,
    );
  };

  const handleOpenSkillsModal = () => {
    openModal(
      <SelectTagModalLayout
        title="기술 스택 검색"
        colorTheme="gray"
        placeholder="보유한 기술스택을 선택해 주세요."
        tagList={TechStacks}
        defaultSelectTagList={skills}
        onSelectComplete={handleSkillsSelectComplete}
      />,
    );
  };

  const handleTagDelete = (type: 'interestJobs' | 'skills', index: number) => {
    if (type === 'interestJobs') {
      setInterestJobs(interestJobs.filter((_, i) => i !== index));
    } else {
      setSkills(skills.filter((_, i) => i !== index));
    }
  };

  const handleInterestJobsSelectComplete = (selectedTags: string[]) => {
    setInterestJobs(selectedTags);
  };

  const handleSkillsSelectComplete = (selectedTags: string[]) => {
    setSkills(selectedTags);
  };

  const handleSubmit = () => {
    const newProfileData = {
      username: name,
      skills,
      interestJobs,
      introduction: '', // #20240721.syjang, 기획에 없는 데이터. 백엔드 확인 필요
    };
    updateProfileMutation.mutate(newProfileData);
  };

  const renderTags = (tags: string[], type: 'interestJobs' | 'skills', onOpenModal: () => void) => (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <li key={index}>
          <TagInput
            value={tag}
            colorTheme="gray"
            buttonType="delete"
            onClick={() => handleTagDelete(type, index)}
          />
        </li>
      ))}
      <li>
        <TagInput
          value={type === 'interestJobs' ? '관심 직무' : '보유 스킬'}
          onClick={onOpenModal}
          colorTheme="gray"
          buttonType="add"
        />
      </li>
    </ul>
  );

  if (isLoading) {
    return <PageSpinner />;
  }

  if (isError) {
    console.error('유저 데이터 가져오기 실패:', error);
    return <div>유저 데이터를 로드하는 중 오류가 발생했습니다.</div>;
  }

  // #20240721.syjang, 아래 부분은 나중에 form으로 수정하겠습니다.
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-12">
      <article className="flex w-full max-w-[1040px] flex-col items-center gap-4">
        <h1 className="self-start text-gray-900 body6">프로필 수정</h1>
        <BorderCard className="flex w-full max-w-[1040px] flex-col gap-8 rounded-[30px] p-6">
          <div className="mx-auto flex w-full max-w-[500px] flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-gray-600 mobile1">이름</label>
              <Input placeholder="이름" value={name} onChange={handleNameChange} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-600 mobile1">메일 주소</label>
              <Input placeholder="PRism@gmail.com" value={email} disabled />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-600 mobile1">관심 직무</label>
              {renderTags(interestJobs, 'interestJobs', handleOpenSelectInterestJobsModal)}
            </div>
            <div className="mb-[30px] flex flex-col gap-2">
              <label className="text-gray-600 mobile1">보유 스킬</label>
              {renderTags(skills, 'skills', handleOpenSkillsModal)}
            </div>
            <nav className="flex justify-center gap-2">
              <MoveBackButton className="w-[72px]" />
              <Button
                className="w-[72px]"
                onClick={handleSubmit}
                disabled={updateProfileMutation.isPending}
                pending={updateProfileMutation.isPending}>
                저장
              </Button>
            </nav>
          </div>
        </BorderCard>
      </article>
    </div>
  );
}
