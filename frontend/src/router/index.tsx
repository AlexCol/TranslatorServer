import { BrowserRouter } from 'react-router-dom';
import LoggedRoutes from './LoggedRoutes';
import NotLoggedRoutes from './NotLoggedRoutes';
import { TSBox } from '@/components/primitives';
import { useAuthContext } from '@/contexts/Auth/AuthContext';

function Router() {
  const { userData } = useAuthContext();
  return (
    <TSBox className='h-full flex items-center justify-center'>
      <BrowserRouter>
        {userData ? (
          <LoggedRoutes /> //? Rotas autenticadas
        ) : (
          <NotLoggedRoutes /> //? Rotas públicas
        )}
      </BrowserRouter>
    </TSBox>
  );
}

export default Router;
