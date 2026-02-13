import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva('text-balance text-foreground', {
  variants: {
    size: {
      display: 'text-4xl leading-tight font-bold',
      h1: 'text-3xl leading-tight font-bold',
      h2: 'text-2xl leading-tight font-semibold',
      h3: 'text-xl leading-snug font-semibold',
      h4: 'text-lg leading-snug font-semibold',
      h5: 'text-base leading-snug font-semibold',
      h6: 'text-sm leading-snug font-semibold',
    },
  },
  defaultVariants: {
    size: 'h2',
  },
});

type TSHeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  };

function TSHeading({ as: Element = 'h2', className, size, ...props }: TSHeadingProps) {
  return <Element className={cn(headingVariants({ size }), className)} {...props} />;
}

export default TSHeading;
