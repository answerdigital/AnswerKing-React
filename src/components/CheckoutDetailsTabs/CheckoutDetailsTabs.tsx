import { ReactElement } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CheckoutDetailsTabs = (): ReactElement => {
  return (
    <div className="mb-6 flex text-[18px] font-[300] leading-[24px]">
      <div className="mx-5 self-center rounded-full bg-[#A2AAB6] px-4 py-1 text-[#333F4C] shadow-md">Order</div>
      <FontAwesomeIcon icon={faAngleRight} className="mx-5 self-center" />
      <div className="mx-5 self-center">Payment Details</div>
      <FontAwesomeIcon icon={faAngleRight} className="mx-5 self-center" />
      <div className="mx-5 self-center">Summary</div>
      <FontAwesomeIcon icon={faAngleRight} className="mx-5 self-center" />
      <div className="mx-5 self-center">Confirmation</div>
    </div>
  );
};
