import { useTheme } from 'next-themes';

export default function useIsDarkMode() {
  const { theme } = useTheme();
  return theme === 'dark';
}
