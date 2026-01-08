// icons.ts
import * as LucideIcons from 'lucide-react';

export const iconMap: Record<string, React.ElementType> = {
  Home: LucideIcons.Home,
  User: LucideIcons.User,
  Settings: LucideIcons.Settings,
  BarChart: LucideIcons.BarChart,
  FileText: LucideIcons.FileText,
  Folder: LucideIcons.Folder,
  Globe: LucideIcons.Globe
};

// Hàm lấy icon component từ string
export const getLucideIconComponent = (iconName: string): React.ElementType | null => {
  return iconMap[iconName] || null;
};
