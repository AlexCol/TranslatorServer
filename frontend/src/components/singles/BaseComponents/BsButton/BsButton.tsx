import { bsButtonStyles } from './bs-button.styles';
import type { BsButtonProps } from '@/components/singles/BaseComponents/BsButton/bs-button.types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function BsButton(props: BsButtonProps) {
  const { buttonProps, variants, asChild, children, className, type } = props;

  let onClick: React.MouseEventHandler<HTMLButtonElement> | undefined = undefined;
  if (type === 'button') {
    onClick = props.onClick;
  }
  const variant = variants?.variant ?? 'default';

  return (
    <Button
      className={cn(bsButtonStyles.customTC(variant), className)}
      type={type}
      onClick={onClick}
      {...variants}
      {...buttonProps}
      asChild={asChild}
    >
      {children}
    </Button>
  );
}

export default BsButton;
export { BsButton };
