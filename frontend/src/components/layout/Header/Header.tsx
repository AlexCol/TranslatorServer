import { LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link } from 'react-router-dom';
import { headerStyles } from './header.styles';
import { TSHeading } from '@/components/primitives';
import { BsBox } from '@/components/singles/BaseComponents';
import { useAuthContext } from '@/contexts/Auth/AuthContext';

function Header() {
  const { signOut } = useAuthContext();
  const { setTheme, theme } = useTheme();

  const themeHandle = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <BsBox className={headerStyles.header}>
      <Link to='/' className={headerStyles.logoLink}>
        <TSHeading as='h1'>Logo</TSHeading>
      </Link>

      <BsBox as={'nav'} className={headerStyles.menuItens}>
        <Link to={''} className={headerStyles.link}>
          Opção 1
        </Link>
        <Link to={''} className={headerStyles.link}>
          Opção 2
        </Link>
        <BsBox elementProps={{ onClick: themeHandle }} className={headerStyles.link}>
          {theme === 'dark' ? <Sun /> : <Moon />}
        </BsBox>
        <BsBox elementProps={{ onClick: signOut }} className={headerStyles.link}>
          <LogOut className={headerStyles.logoutIcon} />
        </BsBox>
      </BsBox>
    </BsBox>
  );
}

export default Header;
