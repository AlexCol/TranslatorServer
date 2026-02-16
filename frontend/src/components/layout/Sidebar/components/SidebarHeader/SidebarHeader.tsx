import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import type { useSidebarType } from '../../useSidebar';
import { sidebarHeaderStyles } from './sidebar-header.styles';
import { BsBox, BsButton } from '@/components/singles/BaseComponents';
import BsHeading from '@/components/singles/BaseComponents/BsHeading/BsHeading';

type SideBarHeaderProps = {
  states: useSidebarType;
};

function SideBarHeader(props: SideBarHeaderProps) {
  const { isCollapsed, toggleSidebar } = props.states;
  return (
    <BsBox className={sidebarHeaderStyles.headerTC}>
      <BsButton
        type='button'
        onClick={toggleSidebar}
        className={sidebarHeaderStyles.toggleButtonTC}
        buttonProps={{ title: isCollapsed ? 'Expandir menu' : 'Recolher menu' }}
      >
        <BsBox className='transition-transform duration-300'>
          {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </BsBox>
      </BsButton>
      {!isCollapsed && (
        <BsHeading as='h2' className={`${sidebarHeaderStyles.titleTC}`}>
          TranslatorServer
        </BsHeading>
      )}
    </BsBox>
  );
}

export default SideBarHeader;
