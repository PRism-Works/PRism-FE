import { XCircle } from 'lucide-react';
import { PlanetIcons } from '@/assets/icon/planet';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TagInput from '@/components/common/input/TagInput';
import { cn } from '@/lib/utils';
import { useFormContext, useFieldArray, FieldErrors } from 'react-hook-form';

import type { ProjectForm, ProjectMember } from '@/models/projectModels';

const DEFAULT_MEMBER: ProjectMember = { name: '', email: '', roles: [] };
const PRIORITY_ERROR_FIELDS: (keyof FieldErrors<ProjectMember>)[] = ['name', 'email', 'roles']; // error 우선순위대로 선언

export default function Step2() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProjectForm>();
  const { fields, append, remove } = useFieldArray<ProjectForm>({ control, name: 'members' });

  // error가 존재하는 field의 우선순위 index 찾기
  const getPriorityErrorIndex = (index: number): number =>
    PRIORITY_ERROR_FIELDS.findIndex((field) => errors.members?.[index]?.[field]);

  const getErrorClass = (index: number, fieldName: keyof FieldErrors<ProjectMember>): string =>
    errors.members?.[index]?.[fieldName] ? 'border-red-500 focus:border-red-500' : '';

  const renderMemberFields = (field: Record<'id', string>, index: number) => {
    const isDefaultMember = index === 0; // 수정 불가 멤버인지 여부 (프로젝트 등록자인 경우, default 값으로 세팅 되어있음)
    const priorityErrorIndex = getPriorityErrorIndex(index);

    const planetKeys = Object.keys(PlanetIcons) as Array<keyof typeof PlanetIcons>;
    const PlanetIcon = PlanetIcons[planetKeys[index % planetKeys.length]];

    return (
      <li key={field.id}>
        {isDefaultMember && <MemberFieldLabels />}
        <div className="flex w-full items-center gap-[6px]">
          <span className="h-[40px] w-[40px] rounded-full bg-gray-100 flex-center">
            <PlanetIcon />
          </span>
          <MemberInputField
            name={`members.${index}.name`}
            placeholder="이름"
            disabled={isDefaultMember}
            className={cn('w-full', getErrorClass(index, 'name'))}
          />
          <MemberInputField
            name={`members.${index}.email`}
            placeholder="prism@gmail.com"
            disabled={isDefaultMember}
            className={cn('w-full', getErrorClass(index, 'email'))}
          />
          {!isDefaultMember && <RemoveMemberButton onRemove={() => remove(index)} />}
        </div>
        <ErrorMessage index={index} priorityErrorIndex={priorityErrorIndex} />
        <RolesField index={index} priorityErrorIndex={priorityErrorIndex} />
      </li>
    );
  };

  return (
    <section className="flex flex-col items-end">
      <FormItem>
        <FormLabel className="text-purple-500 mobile1">팀원정보*</FormLabel>
        <FormDescription className="text-gray-500 caption">
          프로젝트에 참여한 팀원의 정보를 알려주세요
        </FormDescription>
        <ul className="flex flex-col gap-3">{fields.map(renderMemberFields)}</ul>
      </FormItem>
      {fields.length < 10 ? (
        <AddMemberButton onAdd={() => append(DEFAULT_MEMBER)} />
      ) : (
        <p className="mt-3 text-gray-500 caption">최대 팀원 수(10명)에 도달했습니다.</p>
      )}
    </section>
  );
}

const MemberFieldLabels = () => (
  <div className="mb-1 ml-[46px] mt-4 flex gap-[60px] mobile2">
    <span>이름</span>
    <span>메일 주소</span>
  </div>
);

const MemberInputField = ({
  name,
  placeholder,
  disabled,
  className,
}: {
  name: string;
  placeholder: string;
  disabled: boolean;
  className: string;
}) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem className={name.includes('name') ? 'w-[75px]' : 'flex-1'}>
        <FormControl>
          <Input disabled={disabled} className={className} placeholder={placeholder} {...field} />
        </FormControl>
      </FormItem>
    )}
  />
);

const RemoveMemberButton = ({ onRemove }: { onRemove: () => void }) => (
  <span onClick={onRemove}>
    <XCircle className="h-6 w-6 cursor-pointer stroke-gray-400 stroke-[1px] hover:fill-gray-200" />
  </span>
);

const AddMemberButton = ({ onAdd }: { onAdd: () => void }) => (
  <button
    type="button"
    onClick={onAdd}
    className="mt-3 w-full rounded-[4px] border border-dashed border-gray-300 px-4 py-2 text-gray-400 mobile2 hover:bg-gray-200">
    +팀원 추가
  </button>
);

// name, email field 에러 메시지
const ErrorMessage = ({
  index,
  priorityErrorIndex,
}: {
  index: number;
  priorityErrorIndex: number;
}) => {
  const {
    formState: { errors },
  } = useFormContext<ProjectForm>();
  const fieldName = PRIORITY_ERROR_FIELDS[priorityErrorIndex];
  const errorMessage = errors.members?.[index]?.[fieldName]?.message;

  if (!errorMessage || (fieldName !== 'name' && fieldName !== 'email')) return null;

  return (
    <div className="mt-1 flex w-full gap-2">
      <span className="w-[40px]" />
      {fieldName === 'email' && <span className="w-[75px]" />}
      <FormMessage className="text-danger-500 caption">{errorMessage}</FormMessage>
    </div>
  );
};

const RolesField = ({
  index,
  priorityErrorIndex,
}: {
  index: number;
  priorityErrorIndex: number;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProjectForm>();

  return (
    <div className="relative ml-[46px] mt-[4px]">
      <FormField
        control={control}
        name={`members.${index}.roles`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ul className="flex flex-wrap gap-1">
                {field.value.map((role, roleIndex) => (
                  <li key={roleIndex}>
                    <TagInput isDisabled={true} prefixChar="#" defaultValue={role} />
                  </li>
                ))}
                <TagInput isDisabled={true} prefixChar="#" placeholder="역할" />
              </ul>
            </FormControl>
            {priorityErrorIndex === PRIORITY_ERROR_FIELDS.indexOf('roles') && (
              <FormMessage className="text-danger-500 caption">
                {errors.members?.[index]?.roles?.message}
              </FormMessage>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};
