import {ReactElement} from 'react';
import {CheckoutDetailsTabs} from 'components/CheckoutDetailsTabs/CheckoutDetailsTabs';
import {CheckoutDetailsForm} from 'components/CheckoutDetailsForm/CheckoutDetailsForm';

export const CheckoutDetails = (): ReactElement => {
  return (
    <div className="font-poppins flex flex-col items-center">
      <div className="mt-8 mb-4 h-1/6 items-center text-[40px] font-[300] leading-[54px]"
        data-test-id="CheckoutDetailsHeader">
        Checkout
      </div>
      <CheckoutDetailsTabs data-testid="checkout-details-tab"/>
      <CheckoutDetailsForm data-testid="checkout-details-form"/>
    </div>
  );
};
