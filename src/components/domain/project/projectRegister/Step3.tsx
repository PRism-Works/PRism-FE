import { FormControl, FormDescription, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function Step3() {
  return (
    <>
      <FormItem className="mb-[25px]">
        <FormLabel className="text-purple-500 mobile1">프로젝트 명*</FormLabel>
        <FormDescription className="text-gray-500 caption">
          서비스 이름 혹은 팀명을 입력해 주세요
        </FormDescription>
        <FormControl>
          <Input className="w-full" placeholder="이름" />
        </FormControl>
      </FormItem>
      <FormItem className="mb-[25px]">
        <FormLabel className="mobile1">기관명</FormLabel>
        <FormDescription className="text-gray-500 caption">
          서비스 이름 혹은 팀명을 입력해 주세요
        </FormDescription>
        <FormControl>
          <Input className="w-full" placeholder="기관명" />
        </FormControl>
      </FormItem>
      <FormItem>
        <FormLabel className="text-purple-500 mobile1">프로젝트 기간*</FormLabel>
        <FormDescription className="text-gray-500 caption">
          프로젝트 기간을 입력해 주세요
        </FormDescription>
        <FormControl>
          <Input className="w-full" placeholder="syjang" />
        </FormControl>
      </FormItem>
    </>
  );
}
