import { menuItemStyles } from '../menu-item.styles';
import { BsBox } from '@/components/singles/BaseComponents';

type MenuLabelProps = {
  label: string;
  isCollapsed: boolean;
};

function MenuLabel({ label, isCollapsed }: MenuLabelProps) {
  if (isCollapsed) return null;
  return (
    <BsBox as='span' className={`${menuItemStyles.menuLabelTC}`}>
      {label}
    </BsBox>
  );
}
export default MenuLabel;
