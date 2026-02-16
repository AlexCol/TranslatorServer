import { loginStyles } from './login.styles';
import { useLogin } from './useLogin';
import { BsBox, BsButton, BsForm, BsInput, BsLabel } from '@/components/singles/BaseComponents';

function Login() {
  const { login, password, onLoginChange, onPasswordChange, handleSubmit } = useLogin();

  return (
    <BsBox className={loginStyles.pageTC}>
      <BsBox className={loginStyles.decorOrbOneTC} />
      <BsBox className={loginStyles.decorOrbTwoTC} />

      <BsBox className={loginStyles.cardTC}>
        <BsBox className={loginStyles.logoWrapTC}>
          <img src='/main-logo.png' alt='Main logo' className={loginStyles.logoTC} />
        </BsBox>

        <BsBox className={loginStyles.brandSectionTC}>
          <BsLabel className={loginStyles.brandBadgeTC}>Translator Server</BsLabel>
          <BsLabel className={loginStyles.titleTC}>Acesse sua conta</BsLabel>
          <BsLabel className={loginStyles.subtitleTC}>Use suas credenciais para continuar</BsLabel>
        </BsBox>

        <BsForm onSubmit={handleSubmit} className={loginStyles.formTC}>
          <BsBox className={loginStyles.fieldTC}>
            <BsLabel className={loginStyles.fieldLabelTC}>Usuario</BsLabel>
            <BsInput
              type='text'
              placeholder='seu.usuario'
              value={login}
              onChange={onLoginChange}
              className={loginStyles.inputTC}
              required
            />
          </BsBox>

          <BsBox className={loginStyles.fieldTC}>
            <BsLabel className={loginStyles.fieldLabelTC}>Senha</BsLabel>
            <BsInput
              type='password'
              placeholder='••••••••'
              value={password}
              onChange={onPasswordChange}
              className={loginStyles.inputTC}
              required
            />
          </BsBox>

          <BsButton type='submit' variants={{ variant: 'default' }} className={loginStyles.submitButtonTC}>
            Entrar
          </BsButton>
        </BsForm>
      </BsBox>
    </BsBox>
  );
}

export default Login;
