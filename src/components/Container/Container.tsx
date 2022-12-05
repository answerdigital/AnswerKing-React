import { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Container = ({ children }: Props): ReactElement => {
  return <div className="self-center box-border">{children}</div>;
};
