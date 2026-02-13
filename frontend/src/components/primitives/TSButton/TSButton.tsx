import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { tsButtonStyles } from './ts-button.styles';

function TSButton({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  return (
    <Button
      data-slot='button'
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), tsButtonStyles.customTC, className)}
      {...props}
    />
  );
}

export default TSButton;
export { TSButton, buttonVariants as tsButtonVariants };
