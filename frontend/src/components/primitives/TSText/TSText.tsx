import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textVariants = cva('', {
  variants: {
    variant: {
      body: 'text-sm leading-6 text-foreground',
      muted: 'text-sm leading-6 text-muted-foreground',
      small: 'text-xs leading-5 text-muted-foreground',
      lead: 'text-base leading-7 text-foreground',
      success: 'text-sm leading-6 text-green-600',
      error: 'text-sm leading-6 text-destructive',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'body',
    weight: 'regular',
  },
});

type TextProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    as?: React.ElementType;
  };

function Text({ as: Element = 'p', className, variant, weight, ...props }: TextProps) {
  return <Element className={cn(textVariants({ variant, weight }), className)} {...props} />;
}

export default Text;
