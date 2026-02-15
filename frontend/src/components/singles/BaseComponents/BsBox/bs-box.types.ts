export type BsBoxProps = {
  as?: React.ElementType;
  asChild?: boolean;
  elementProps?: Omit<React.HTMLAttributes<HTMLElement>, RemovedElementProps>;
  children?: React.ReactNode;
  className?: string;
};

type RemovedElementProps = 'className' | 'children';
