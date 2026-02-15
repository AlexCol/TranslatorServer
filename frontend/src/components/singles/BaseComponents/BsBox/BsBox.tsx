import { Slot } from 'radix-ui';
import type { BsBoxProps } from './bs-box.types';
import { cn } from '@/lib/utils';

function BsBox(props: BsBoxProps) {
  const { as: Element = 'div', asChild = false, className, elementProps, children } = props;
  const Comp = asChild ? Slot.Root : Element;

  return (
    <Comp className={cn(className)} {...elementProps}>
      {children}
    </Comp>
  );
}

export default BsBox;
