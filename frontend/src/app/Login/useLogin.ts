import { useState } from 'react';
import { useAuthContext } from '@/contexts/Auth/AuthContext';
import { setRememberMe } from '@/services/api';

export function useLogin() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuthContext();

  const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setRememberMe(true);
      await signIn({
        credentials: {
          username: login,
          password,
        },
        rememberMe: true,
      });
    } catch {}
  };

  return {
    login,
    password,
    onLoginChange,
    onPasswordChange,
    handleSubmit,
  };
}
