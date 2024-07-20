'use client';

import { useEffect, useState } from 'react';
import { useModalStore } from '@/stores/modalStore';
import { useUpdateProfile, useUserData } from '@/hooks/queries/useUserService';
import { TechStacks, UserRoles } from '@/lib/tagList';
import { PageSpinner } from '@/components/common/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SelectTagModalLayout from '@/components/common/modal/SelectTagModalLayout';
import TagInput from '@/components/common/input/TagInput';

export default function EditMyPage() {
  const { data: user, isLoading, isError, error } = useUserData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interestJobs, setInterestJobs] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const openModal = useModalStore((state) => state.openModal);
  const updateProfileMutation = useUpdateProfile();

  useEffect(() => {
    if (user) {
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
        title="역할 검색"
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
    const profileData = {
      username: name,
      skills,
      interestJobs,
    };
    updateProfileMutation.mutate(profileData);
  };

  if (isLoading) {
    return <PageSpinner />;
  }

  if (isError) {
    console.error('유저 데이터 가져오기 실패:', error);
    return <div>Error loading user data</div>;
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center p-12">
      <div className="flex w-full justify-end" style={{ width: '90%' }}></div>
      <div className="flex w-full max-w-[1040px] flex-col items-center gap-4">
        <span className="self-start text-gray-900 body6">프로필 수정</span>{' '}
        <div className="flex w-full max-w-[1040px] flex-col gap-8 rounded-[30px] bg-white p-8">
          <div className="mx-auto flex w-full max-w-[500px] flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 mobile1">이름</span>
              <Input placeholder="이름" value={name} onChange={handleNameChange} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 mobile1">메일 주소</span>
              <Input placeholder="PRism@gmail.com" value={email} disabled />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 mobile1">관심 직무</span>
              <ul className="flex flex-wrap gap-2">
                {interestJobs.map((job, index) => (
                  <li key={index}>
                    <TagInput
                      value={job}
                      colorTheme="gray"
                      buttonType="delete"
                      onClick={() => handleTagDelete('interestJobs', index)}
                    />
                  </li>
                ))}
                <li>
                  <TagInput
                    value="관심 직무"
                    onClick={handleOpenSelectInterestJobsModal}
                    colorTheme="gray"
                    buttonType="add"
                  />
                </li>
              </ul>
            </div>
            <div className="mb-[60px] flex flex-col gap-2">
              <span className="text-gray-600 mobile1">보유 스킬</span>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <li key={index}>
                    <TagInput
                      value={skill}
                      colorTheme="gray"
                      buttonType="delete"
                      onClick={() => handleTagDelete('skills', index)}
                    />
                  </li>
                ))}
                <li>
                  <TagInput
                    value="보유 스킬"
                    onClick={handleOpenSkillsModal}
                    colorTheme="gray"
                    buttonType="add"
                  />
                </li>
              </ul>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                className="border-1 w-[72px] border border-gray-700 text-gray-700"
                onClick={() => window.history.back()}>
                취소
              </Button>
              <Button
                variant="default"
                className="w-[72px] bg-purple-500 hover:bg-purple-600"
                onClick={handleSubmit}>
                저장
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
