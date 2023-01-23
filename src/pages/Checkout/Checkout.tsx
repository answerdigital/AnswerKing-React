import { CheckoutDetails } from 'components/CheckoutDetails/CheckoutDetails';
import { PageTransition } from 'components/PageTransition/PageTransition';
import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';

export const CheckoutPage = (): ReactElement => {
  return (
    <>
      <Helmet>
        <title>Checkout - Answer King</title>
      </Helmet>
      <PageTransition>
        <CheckoutDetails />
      </PageTransition>
    </>
  );
};
