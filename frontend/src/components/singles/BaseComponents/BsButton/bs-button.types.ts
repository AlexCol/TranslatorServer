import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants } from '@/components/ui/button';

type NativeButtonProps = Omit<React.ComponentProps<'button'>, RemovidedElementProps>;
type RemovidedElementProps = 'className' | 'children' | 'onClick';

type ButtonVariants =
  | {
      type: 'button';
      buttonProps?: NativeButtonProps;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
    }
  | {
      type: 'submit';
      buttonProps?: NativeButtonProps;
    }
  | {
      type: 'reset';
      buttonProps?: NativeButtonProps;
    };

export type BsButtonProps = ButtonVariants & {
  variants?: VariantProps<typeof buttonVariants>;
  asChild?: boolean;
  children?: React.ReactNode;
  className?: string;
};
