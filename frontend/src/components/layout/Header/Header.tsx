import { LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link } from 'react-router-dom';
import { headerStyles } from './header.styles';
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
        <BsBox className={headerStyles.logoWrapTC}>
          <img src='/main-logo.png' alt='Main logo' className={headerStyles.logoTC} />
        </BsBox>
      </Link>

      <BsBox as={'nav'} className={headerStyles.menuItens}>
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
