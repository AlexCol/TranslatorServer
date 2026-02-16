import * as LucideIcons from 'lucide-react';
import { menuItemStyles } from '../menu-item.styles';
import { BsBox } from '@/components/singles/BaseComponents';

type MenuIconProps = {
  icon: string;
  hasActiveChildren?: boolean;
};

function MenuIcon({ icon, hasActiveChildren }: MenuIconProps) {
  const Icon = (LucideIcons as any)[icon] || LucideIcons.Circle;

  return (
    <BsBox className={menuItemStyles.iconContainerTC}>
      <Icon size={20} className={menuItemStyles.menuIconTC} />
      {hasActiveChildren && <BsBox className={menuItemStyles.activeChildDotTC} />}
    </BsBox>
  );
}

export default MenuIcon;
