import { Container } from 'common/Container/Container';
import { Navigation } from 'common/Navigation/Navigation';
import { ToastWrapper } from 'common/ToastWrapper/ToastWrapper';
import { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props): ReactElement => {
  return (
    <>
      <Navigation />
      <ToastWrapper />
      <Container>{children}</Container>
    </>
  );
};
