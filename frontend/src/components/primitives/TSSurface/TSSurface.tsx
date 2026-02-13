import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import TSBox from '@/components/primitives/TSBox';

const surfaceVariants = cva('rounded-lg border', {
  variants: {
    tone: {
      default: 'border-border bg-card text-card-foreground shadow-sm',
      muted: 'border-border bg-muted/40 text-foreground',
      accent: 'border-accent/30 bg-accent/10 text-foreground',
      success: 'border-green-500/20 bg-green-500/10 text-foreground',
      danger: 'border-destructive/30 bg-destructive/10 text-foreground',
    },
    padding: {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    tone: 'default',
    padding: 'md',
  },
});

type TSSurfaceProps = React.ComponentProps<typeof TSBox> & VariantProps<typeof surfaceVariants>;

function TSSurface({ className, tone, padding, ...props }: TSSurfaceProps) {
  return <TSBox className={cn(surfaceVariants({ tone, padding }), className)} {...props} />;
}

export default TSSurface;
