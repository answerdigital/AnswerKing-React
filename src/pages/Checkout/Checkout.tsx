import { CheckoutDetails } from 'components/CheckoutDetails/CheckoutDetails';
import { PageLayout } from 'components/PageLayout/PageLayout';
import { ReactElement } from 'react';

export const CheckoutPage = (): ReactElement => {
  return (
    <PageLayout title={'Checkout - Answer King'}>
      <CheckoutDetails />
    </PageLayout>
  );
};
