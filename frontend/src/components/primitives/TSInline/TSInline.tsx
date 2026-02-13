import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import TSBox from '@/components/primitives/TSBox';

const inlineVariants = cva('flex flex-row', {
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
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    gap: 'md',
    align: 'center',
    justify: 'start',
    wrap: false,
  },
});

type TSInlineProps = React.ComponentProps<typeof TSBox> & VariantProps<typeof inlineVariants>;

function TSInline({ className, gap, align, justify, wrap, ...props }: TSInlineProps) {
  return <TSBox className={cn(inlineVariants({ gap, align, justify, wrap }), className)} {...props} />;
}

export default TSInline;
