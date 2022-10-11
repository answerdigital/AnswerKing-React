import './Container.scss';
import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Container = ({ children }: Props): ReactElement => {
  return <div className="container">{children}</div>;
};
