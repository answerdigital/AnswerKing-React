import { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Container = ({ children }: Props): ReactElement => {
  return <div data-testid="container" className="box-border items-center">{children}</div>;
};
