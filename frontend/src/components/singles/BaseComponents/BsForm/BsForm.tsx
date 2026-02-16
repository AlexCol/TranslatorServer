import type { BsFormProps } from './bs-form.types';
import { useForm } from './useForm';

function BsForm(props: BsFormProps) {
  const { children, className, nativeFormProps } = props;
  const { handleSubmit } = useForm(props);
  const FormComponent: React.ElementType = 'form';

  return (
    <FormComponent onSubmit={handleSubmit} className={className} {...nativeFormProps}>
      {children}
    </FormComponent>
  );
}

export default BsForm;
