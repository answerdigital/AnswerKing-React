import { ReactElement } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

export const CheckoutDetailsTabs = (): ReactElement => {
  const tabElement = 'mx-5 self-center';
  return (
    <div data-testid="checkout-details-tab" className="mb-6 flex text-[18px] font-[300] leading-[24px]">
      <div data-testid="order-tab" className={cn(tabElement, 'rounded-full bg-[#A2AAB6] px-4 py-1 text-[#333F4C] shadow-md')}>Order</div>
      <FontAwesomeIcon icon={faAngleRight} className={cn(tabElement, 'text-[15px]')} />
      <div data-testid="payment-tab" className={cn(tabElement)}>Payment Details</div>
      <FontAwesomeIcon icon={faAngleRight} className={cn(tabElement, 'text-[15px]')} />
      <div data-testid="summary-tab" className={cn(tabElement)}>Summary</div>
      <FontAwesomeIcon icon={faAngleRight} className={cn(tabElement, 'text-[15px]')} />
      <div data-testid="confirmation-tab" className={cn(tabElement)}>Confirmation</div>
    </div>
  );
};
