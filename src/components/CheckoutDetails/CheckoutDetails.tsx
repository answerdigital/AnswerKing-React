import { ReactElement } from 'react';
import { CheckoutDetailsTabs } from 'components/CheckoutDetailsTabs/CheckoutDetailsTabs';
import { CheckoutDetailsForm } from 'components/CheckoutDetailsForm/CheckoutDetailsForm';

export const CheckoutDetails = (): ReactElement => {
  return (
    <div className="flex flex-col items-center font-poppins">
      <div className="mt-8 mb-5 h-1/6 items-center text-[40px] leading-[54px]">Checkout</div>
      <CheckoutDetailsTabs />
      <CheckoutDetailsForm />
    </div>
  );
};
