import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';
import { setAuthFailHandler, setRememberMe } from './services/api';
import { getAuthentication } from './services/generated/authentication/authentication';
import type { SessionPayload } from './services/generated/models';
import { getTranslations } from './services/generated/translations/translations';

function useApp() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedData, setLoggedData] = useState<SessionPayload | null>(null);
  const [jsonData, setJsonData] = useState<Record<string, any> | null>(null);

  const handleLogout = async () => {
    try {
      if (loggedIn) {
        await getAuthentication().authenticationControllerLogout();
      }
    } catch {
    } finally {
      setLoggedIn(false);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setRememberMe(true); // Ativar rememberMe para este login
      const response = await getAuthentication().authenticationControllerLogin({
        username: login,
        password,
      });
      if (response.id) {
        setLoggedIn(true);
        setLoggedData(response);
      }
    } catch {
      setLoggedIn(false);
    }
  };

  // //! Verificar se o usuário já está autenticado ao carregar o app
  const checkSession = async () => {
    try {
      const response = await getAuthentication().authenticationControllerCheckSession();
      if (response.id) {
        setLoggedIn(true);
        setLoggedData(response);
      }
    } catch {
      setLoggedIn(false);
    }
  };

  const fetchTranslations = async () => {
    try {
      const system = 'backend';
      const environment = 'dev';
      const language = 'pt-BR';
      const namespace = 'Contratos';
      const json = await getTranslations().translationsControllerLoadWithFallBack(
        system,
        environment,
        language,
        namespace,
      );
      setJsonData(json);
    } catch (error) {
      alert('Error fetching JSON: ' + error);
    }
  };

  useEffect(() => {
    setAuthFailHandler(handleLogout);
    void checkSession();
  }, []);

  return {
    login,
    setLogin,
    password,
    setPassword,
    loggedIn,
    handleSubmit,
    handleLogout,
    loggedData,
    fetchTranslations,
    jsonData,
  };
}
type useAppType = ReturnType<typeof useApp>;

function App() {
  const states = useApp();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      {states.loggedIn ? <LoggedOutComponent {...states} /> : <LoggedComponent {...states} />}
    </div>
  );
}

export default App;

function LoggedOutComponent(states: useAppType) {
  const { handleLogout, loggedData, fetchTranslations, jsonData } = states;
  return (
    <div className='flex flex-col gap-4 items-center'>
      <p>Welcome, {loggedData?.firstname}!</p>
      <p>Session ID: {loggedData?.id}</p>
      <Button onClick={handleLogout}>Logout</Button>
      <Button onClick={fetchTranslations}>Fetch Translations</Button>
      {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
    </div>
  );
}

function LoggedComponent(states: useAppType) {
  const { login, setLogin, password, setPassword, handleSubmit } = states;
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input type='text' placeholder='Login' value={login} onChange={(e) => setLogin(e.target.value)} />
      <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type='submit'>Submit</Button>
    </form>
  );
}
