import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants } from '@/components/ui/button';

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;

const invertedByVariant: Record<ButtonVariant, string> = {
  default: `
    hover:bg-background
    hover:text-primary
  `,
  destructive: `
    hover:bg-background
    hover:text-destructive
  `,
  outline: `
    hover:bg-primary
    hover:text-primary-foreground
  `,
  secondary: `
    hover:bg-background
    hover:text-secondary
  `,
  ghost: `
    hover:bg-background
    hover:text-accent-foreground
  `,
  link: `
    hover:bg-background
    hover:text-primary
  `,
};

export const bsButtonStyles = {
  customTC: (variant: ButtonVariant) => `
    cursor-pointer
    active:scale-97
    disabled:cursor-not-allowed
    disabled:opacity-50
    transition-colors
    hover:ring-1
    hover:ring-current
    ${invertedByVariant[variant]}
  `,
};
