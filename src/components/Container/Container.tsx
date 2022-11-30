import { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Container = ({ children }: Props): ReactElement => {
  return <div className="self-center mx-96 box-border h-full">{children}</div>;
};
