import { BrowserRouter } from 'react-router-dom';
import LoggedRoutes from './LoggedRoutes';
import NotLoggedRoutes from './NotLoggedRoutes';
import { BsBox } from '@/components/singles/BaseComponents';
import { useAuthContext } from '@/contexts/Auth/AuthContext';

function Router() {
  const { userData } = useAuthContext();
  return (
    <BsBox className='min-h-screen w-full'>
      <BrowserRouter>
        {userData ? (
          <LoggedRoutes /> //? Rotas autenticadas
        ) : (
          <NotLoggedRoutes /> //? Rotas públicas
        )}
      </BrowserRouter>
    </BsBox>
  );
}

export default Router;
