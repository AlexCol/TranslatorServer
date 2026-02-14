import { useState } from 'react';
import { toast } from 'sonner';
import { TSForm, TSInput, TSText } from '@/components/primitives';
import TSBox from '@/components/primitives/TSBox';
import BsButton from '@/components/singles/BaseComponents/BsButton/BsButton';
import { useAuthContext } from '@/contexts/Auth/AuthContext';
import { setRememberMe } from '@/services/api';
import { getTranslations } from '@/services/generated/translations/translations';

function useLogin() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [jsonData, setJsonData] = useState<Record<string, any> | null>(null);
  const { isAuthenticated, userData, signIn, signOut } = useAuthContext();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch {
    } finally {
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setRememberMe(true); // Ativar rememberMe para este login
      await signIn({
        credentials: {
          username: login,
          password,
        },
        rememberMe: true,
      });
    } catch {}
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

  return {
    login,
    setLogin,
    password,
    setPassword,
    loggedIn: isAuthenticated,
    handleSubmit,
    handleLogout,
    loggedData: userData,
    fetchTranslations,
    jsonData,
  };
}

function Login() {
  const states = useLogin();
  const { login, setLogin, password, setPassword, handleSubmit } = states;

  return (
    <TSBox className='flex min-h-screen flex-col items-center justify-center'>
      <TSForm onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <TSText>Welcome, !</TSText>
        <TSInput type='text' placeholder='Login' value={login} onChange={(e) => setLogin(e.target.value)} />
        <TSInput
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <BsButton type='button' buttonProps={{ onClick: () => {} }} variants={{ variant: 'secondary' }}>
          Submit
        </BsButton>
      </TSForm>
    </TSBox>
  );
}

export default Login;
