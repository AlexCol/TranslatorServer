import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '@/lib/utils';

const tsLinkVariants = cva('inline-flex items-center underline-offset-4 transition-colors focus-visible:outline-none', {
  variants: {
    variant: {
      default: 'text-primary hover:underline',
      subtle: 'text-muted-foreground hover:text-foreground hover:underline',
      destructive: 'text-destructive hover:underline',
      success: 'text-green-600 hover:underline',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: {
    variant: 'default',
    weight: 'medium',
  },
});

type TSLinkInternalProps = {
  external?: false;
  to: LinkProps['to'];
  href?: never;
} & Omit<LinkProps, 'to' | 'className'>;

type TSLinkExternalProps = {
  external: true;
  href: string;
  to?: never;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>;

type TSLinkProps = (TSLinkInternalProps | TSLinkExternalProps) &
  VariantProps<typeof tsLinkVariants> & {
    className?: string;
  };

function TSLink(props: TSLinkProps) {
  const { className, variant, weight } = props;
  const classes = cn(tsLinkVariants({ variant, weight }), className);

  if (props.external) {
    const { external: _external, href, target, rel, ...rest } = props;
    const safeRel = target === '_blank' ? rel ?? 'noreferrer noopener' : rel;
    return <a href={href} target={target} rel={safeRel} className={classes} {...rest} />;
  }

  const { to, ...rest } = props;
  return <Link to={to} className={classes} {...rest} />;
}

export default TSLink;
export { TSLink, tsLinkVariants };
