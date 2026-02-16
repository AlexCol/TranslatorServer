import type { useSidebarType } from '../../useSidebar';
import { BsBox } from '@/components/singles/BaseComponents';
import { useAuthContext } from '@/contexts/Auth/AuthContext';

type SidebarFooterProps = {
  states: useSidebarType;
};

export default function SidebarFooter({ states }: SidebarFooterProps) {
  const { userData } = useAuthContext();
  const userName = userData?.firstname ? `${userData.firstname} ${userData.lastname}` : 'Usuario';

  return (
    <BsBox className='mt-auto h-14 border-t border-sidebar-border px-3 flex items-center bg-sidebar transition-colors duration-300'>
      <BsBox
        className={`text-sm font-medium text-sidebar-foreground truncate ${states.isCollapsed ? 'text-center w-full' : 'text-center w-full'}`}
        elementProps={{ title: userName }}
      >
        {states.isCollapsed ? userName.charAt(0).toUpperCase() : userName}
      </BsBox>
    </BsBox>
  );
}
