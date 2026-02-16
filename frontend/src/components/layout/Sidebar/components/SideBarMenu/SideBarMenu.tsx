import type { useSidebarType } from '../../useSidebar';
import { MenuItem } from './MenuItem/MenuItem';
import { sidebarMenuStyles } from './sidebar-menu.styles';
import { BsBox } from '@/components/singles/BaseComponents';

export type MenuProps = {
  menuStates: useSidebarType;
};

function SidebarMenu({ menuStates }: MenuProps) {
  const { menus } = menuStates;

  return (
    <BsBox as='nav' className={sidebarMenuStyles.navTC}>
      <BsBox as='ul' className={sidebarMenuStyles.menuListTC}>
        {menus.map((menu) => (
          <BsBox as='div' key={menu.id}>
            <MenuItem
              menu={menu}
              isCollapsed={menuStates.isCollapsed}
              isMenuItemOpenChecker={menuStates.isMenuItemOpenChecker}
              toggleMenu={menuStates.toggleMenu}
              level={0}
              currentPath={menuStates.pathname}
            />
          </BsBox>
        ))}
      </BsBox>
    </BsBox>
  );
}

export default SidebarMenu;
