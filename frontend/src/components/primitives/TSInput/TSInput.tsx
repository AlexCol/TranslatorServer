import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      state: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive/30',
        success: 'border-green-600 focus-visible:ring-green-600/30',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);

type TSInputProps = React.ComponentProps<'input'> & VariantProps<typeof inputVariants>;

function TSInput({ className, state, ...props }: TSInputProps) {
  return <input className={cn(inputVariants({ state }), className)} {...props} />;
}

export default TSInput;
