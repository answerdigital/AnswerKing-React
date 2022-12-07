import { Container } from 'components/Container/Container';
import { ToastWrapper } from 'components/ToastWrapper/ToastWrapper';
import { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props): ReactElement => {
  return (
    <>
      <ToastWrapper />
      <Container>{children}</Container>
    </>
  );
};
