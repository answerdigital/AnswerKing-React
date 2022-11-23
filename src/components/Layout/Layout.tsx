import { Container } from 'components/Container/Container';
import { Navigation } from 'components/Navigation/Navigation';
import { NavigationMobile } from 'components/NavigationMobile/NavigationMobile';
import { ToastWrapper } from 'components/ToastWrapper/ToastWrapper';
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
      <NavigationMobile />
    </>
  );
};
