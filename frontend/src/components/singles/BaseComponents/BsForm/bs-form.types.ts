type NativeFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, RemovidedElementProps>;
type RemovidedElementProps = 'onSubmit' | 'className' | 'children';

export type BsFormProps = {
  className?: string;
  children?: React.ReactNode;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  nativeFormProps?: NativeFormProps;
  //
  allowSpam?: boolean;
  spamDelay?: number;
};
