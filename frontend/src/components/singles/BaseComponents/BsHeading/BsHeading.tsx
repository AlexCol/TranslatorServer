import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
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
});

type RemovidedElementProps = 'className' | 'children';
type NativeHeadingProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, RemovidedElementProps>;
type BsHeadingProps = {
  className?: string;
  children?: React.ReactNode;
  //
  size?: VariantProps<typeof headingVariants>['size'];
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  baseHeadingProps?: NativeHeadingProps;
};

function BsHeading({ as: Element = 'h1', className, size, baseHeadingProps, children }: BsHeadingProps) {
  return (
    <Element className={cn(headingVariants({ size }), className)} {...baseHeadingProps}>
      {children}
    </Element>
  );
}

export default BsHeading;
