import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import TSBox from '@/components/primitives/TSBox';

const tsStackVariants = cva('flex flex-col', {
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
  },
  defaultVariants: {
    gap: 'md',
    align: 'stretch',
    justify: 'start',
  },
});

type TSStackProps = React.ComponentProps<typeof TSBox> & VariantProps<typeof tsStackVariants>;

function TSStack({ className, gap, align, justify, ...props }: TSStackProps) {
  return <TSBox className={cn(tsStackVariants({ gap, align, justify }), className)} {...props} />;
}

export default TSStack;
