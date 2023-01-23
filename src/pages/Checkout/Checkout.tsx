import { CheckoutDetails } from 'components/CheckoutDetails/CheckoutDetails';
import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';

export const CheckoutPage = (): ReactElement => {
  return (
    <>
      <Helmet>
        <title>Checkout - Answer King</title>
      </Helmet>
      <CheckoutDetails />
    </>
  );
};
