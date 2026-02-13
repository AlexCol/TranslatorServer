import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';
import { setAuthFailHandler, setRememberMe } from './services/api';
import { getAuthentication } from './services/generated/authentication/authentication';

function App() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
      await getAuthentication().authenticationControllerLogout();
    } catch {
    } finally {
      setLoggedIn(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setRememberMe(true); // Ativar rememberMe para este login
      const response = await getAuthentication().authenticationControllerLogin({
        username: login,
        password,
      });
      console.log('Login response:', response);
      if (response.id) {
        setLoggedIn(true);
      } else {
      }
    } catch (error) {
      setLoggedIn(false);
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    setAuthFailHandler(handleLogout);

    //! Verificar se o usuário já está autenticado ao carregar o app
    // void (async () => {
    //   try {
    //     const response = await getsess().authenticationControllerCheck();
    //     if (response.id) {
    //       setLoggedIn(true);
    //       setLogin(response.username || '');
    //     }
    //   } catch {
    //     setLoggedIn(false);
    //   }
    // })();
  }, []);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      {loggedIn ? (
        <div className='flex flex-col gap-4 items-center'>
          <p>Welcome, {login}!</p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type='text' placeholder='Login' value={login} onChange={(e) => setLogin(e.target.value)} />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type='submit'>Submit</Button>
        </form>
      )}
    </div>
  );
}

export default App;
