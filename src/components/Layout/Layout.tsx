import { Container } from 'components/Container/Container';
import { Navigation } from 'components/Navigation/Navigation';
import { NavigationMobile } from 'components/NavigationMobile/NavigationMobile';
import { OrderPanel } from 'components/OrderPanel/OrderPanel';
import { ToastWrapper } from 'components/ToastWrapper/ToastWrapper';
import React, { ReactElement, ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props): ReactElement => {
  const [orderPanelIsOpen, setOrderPanelIsOpen] = useState(false);

  const handleToggle = (): void => setOrderPanelIsOpen((isOpen) => !isOpen);

  return (
    <>
      <Navigation orderPanelIsOpen={orderPanelIsOpen} toggleOrderPanel={handleToggle} />
      <ToastWrapper />
      {orderPanelIsOpen && <OrderPanel toggleOrderPanel={handleToggle} />}
      <Container>{children}</Container>

      <NavigationMobile toggleOrderPanel={handleToggle} />
    </>
  );
};
