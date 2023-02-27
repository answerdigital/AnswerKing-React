import { ReactElement, ReactNode } from 'react';
import Container from 'common/Container/Container';
import Navigation from 'common/Navigation/Navigation';
import ToastWrapper from 'common/ToastWrapper/ToastWrapper';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
  return (
    <>
      <Navigation />
      <ToastWrapper />
      <Container>{children}</Container>
    </>
  );
}
