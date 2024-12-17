import { FormDescription, FormItem, FormLabel } from '@/components/ui/form';

interface SectionLayoutProps {
  label: string;
  description: string;
  children: React.ReactNode;
}

export function SectionLayout({ label, description, children }: SectionLayoutProps) {
  return (
    <FormItem className="space-y-3">
      <div className="space-y-1">
        <FormLabel className="text-purple-500 mobile1">{label}</FormLabel>
        <FormDescription className="text-gray-500 caption">{description}</FormDescription>
      </div>
      {children}
    </FormItem>
  );
}
