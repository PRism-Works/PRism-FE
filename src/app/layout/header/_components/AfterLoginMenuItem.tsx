import { MenubarItem } from '@/components/ui/menubar';

interface AfterLoginMenuItemProps {
  label: string;
  onClick?: () => void;
}
export default function AfterLoginMenuItem({ label, onClick }: AfterLoginMenuItemProps) {
  return (
    <MenubarItem className="cursor-pointer display4" onClick={onClick}>
      <span>{label}</span>
    </MenubarItem>
  );
}
