import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { TSButton, TSForm, TSInput, TSText } from '@/components/primitives';
import TSBox from '@/components/primitives/TSBox';
import { setAuthFailHandler, setRememberMe } from '@/services/api';
import { getAuthentication } from '@/services/generated/authentication/authentication';
import type { SessionPayload } from '@/services/generated/models';
import { getTranslations } from '@/services/generated/translations/translations';

function useLogin() {
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

  // //! Verificar se o usuário já está autenticado ao carregar o Login
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
      toast.success('Translations fetched successfully!');
    } catch (error) {
      toast.error('Failed to fetch translations: ' + (error instanceof Error ? error.message : 'Unknown error'));
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
type useLoginType = ReturnType<typeof useLogin>;

function Login() {
  const states = useLogin();

  return (
    <TSBox className='flex min-h-screen flex-col items-center justify-center'>
      {states.loggedIn ? <LoggedOutComponent {...states} /> : <LoggedComponent {...states} />}
    </TSBox>
  );
}

export default Login;

function LoggedOutComponent(states: useLoginType) {
  const { handleLogout, loggedData, fetchTranslations, jsonData } = states;
  return (
    <TSBox className='flex flex-col gap-4 items-center'>
      <TSText>Welcome, {loggedData?.firstname}!</TSText>
      <TSText>Session ID: {loggedData?.id}</TSText>
      <TSButton onClick={handleLogout}>Logout</TSButton>
      <TSButton onClick={fetchTranslations}>Fetch Translations</TSButton>
      {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
    </TSBox>
  );
}

function LoggedComponent(states: useLoginType) {
  const { login, setLogin, password, setPassword, handleSubmit } = states;
  return (
    <TSForm onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <TSText>Welcome, !</TSText>
      <TSInput type='text' placeholder='Login' value={login} onChange={(e) => setLogin(e.target.value)} />
      <TSInput type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <TSButton type='submit'>Submit</TSButton>
    </TSForm>
  );
}
