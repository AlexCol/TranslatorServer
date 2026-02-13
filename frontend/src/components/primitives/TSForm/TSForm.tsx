import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const formVariants = cva('flex flex-col', {
  variants: {
    gap: {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    },
  },
  defaultVariants: {
    gap: 'md',
  },
});

type TSFormProps = React.FormHTMLAttributes<HTMLFormElement> & VariantProps<typeof formVariants>;

function TSForm({ className, gap, ...props }: TSFormProps) {
  return <form className={cn(formVariants({ gap }), className)} {...props} />;
}

export default TSForm;
