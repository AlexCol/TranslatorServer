import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const selectVariants = cva(
  'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
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

type TSSelectProps = React.ComponentProps<'select'> & VariantProps<typeof selectVariants>;
type TSSelectOptionProps = React.ComponentProps<'option'>;

function TSSelect({ className, state, children, ...props }: TSSelectProps) {
  return (
    <select className={cn(selectVariants({ state }), className)} {...props}>
      {children}
    </select>
  );
}

function TSSelectOption(props: TSSelectOptionProps) {
  return <option {...props} />;
}

export default TSSelect;
export { TSSelect, TSSelectOption };
