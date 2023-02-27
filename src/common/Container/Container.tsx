import { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props): ReactElement {
  return (
    <div data-testid="container" className="box-border items-center">
      {children}
    </div>
  );
}
