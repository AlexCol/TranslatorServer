import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/utils';

type TSBoxProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  asChild?: boolean;
};

function TSBox({ as: Element = 'div', asChild = false, className, ...props }: TSBoxProps) {
  const Comp = asChild ? Slot.Root : Element;

  return <Comp className={cn(className)} {...props} />;
}

export default TSBox;
