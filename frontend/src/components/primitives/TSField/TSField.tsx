import * as React from 'react';
import { cn } from '@/lib/utils';
import TSText from '@/components/primitives/TSText';
import TSStack from '@/components/primitives/TSStack';

type TSFieldProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
};

function TSField({ className, label, hint, error, htmlFor, required, children, ...props }: TSFieldProps) {
  return (
    <TSStack gap='sm' className={className} {...props}>
      {label ? (
        <label htmlFor={htmlFor} className='text-sm font-medium text-foreground'>
          {label}
          {required ? (
            <TSText as='span' className='ml-1 text-destructive'>
              *
            </TSText>
          ) : null}
        </label>
      ) : null}

      {children}

      {error ? <TSText variant='error'>{error}</TSText> : hint ? <TSText variant='small'>{hint}</TSText> : null}
    </TSStack>
  );
}

type TSFieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

function TSFieldLabel({ className, ...props }: TSFieldLabelProps) {
  return <label className={cn('text-sm font-medium text-foreground', className)} {...props} />;
}

type TSFieldHintProps = React.HTMLAttributes<HTMLParagraphElement>;

function TSFieldHint({ className, ...props }: TSFieldHintProps) {
  return <TSText as='p' variant='small' className={className} {...props} />;
}

type TSFieldErrorProps = React.HTMLAttributes<HTMLParagraphElement>;

function TSFieldError({ className, ...props }: TSFieldErrorProps) {
  return <TSText as='p' variant='error' className={className} {...props} />;
}

export default TSField;
export { TSFieldLabel, TSFieldHint, TSFieldError };
