import { useState } from 'react';
import { toast } from 'sonner';
import type { BsFormProps } from './bs-form.types';

export function useForm(props: BsFormProps) {
  const [isThrottled, setIsThrottled] = useState(false);
  const shouldPreventSpam = props.allowSpam !== true;
  const delay = props.spamDelay || 2000; // Default 2 segundos

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    //! valida se em spam e se o formulário está em throttle
    if (shouldPreventSpam && isThrottled) {
      toast.warning('Aguarde antes de enviar novamente.');
      return; // Ignorar clique se estiver em throttle
    }

    //! Validação nativa do formulário
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity(); // mostra mensagens nativas do browser
      toast.error('Por favor, preencha todos os campos corretamente.');
      return; // Ignorar submissão se o formulário for inválido
    }

    //! Iniciar throttle para prevenir spam
    if (shouldPreventSpam) {
      // Iniciar throttle
      setIsThrottled(true);
      setTimeout(() => {
        setIsThrottled(false);
      }, delay);
    }

    //! Chamar o onSubmit passado via props
    if (props.onSubmit) {
      props.onSubmit(e);
    }
  };

  return { handleSubmit };
}
