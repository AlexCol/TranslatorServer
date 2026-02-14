import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants } from '@/components/ui/button';

type NativeButtonProps = Omit<React.ComponentProps<'button'>, 'children' | 'type'>;

type ButtonVariants =
  | {
      type: 'button';
      buttonProps?: NativeButtonProps;
    }
  | {
      type: 'submit';
      buttonProps?: Omit<NativeButtonProps, 'onClick'>;
    }
  | {
      type: 'reset';
      buttonProps?: Omit<NativeButtonProps, 'onClick'>;
    };

export type BsButtonProps = ButtonVariants & {
  variants?: VariantProps<typeof buttonVariants>;
  asChild?: boolean;
  children?: React.ReactNode;
};
