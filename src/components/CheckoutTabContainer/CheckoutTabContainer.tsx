import { ReactElement } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { CheckoutTabType } from 'context/CheckoutTabContext';

interface TabProps {
  children: React.ReactNode;
  active?: boolean;
}

const Tab = ({ children, active }: TabProps): ReactElement => {
  return (
    <div className={cn('mx-5 select-none self-center', { 'rounded-full bg-[#A2AAB6] px-4 py-1 text-[#333F4C] shadow-md': active })}>{children}</div>
  );
};

interface Props {
  tab: CheckoutTabType;
}

export const CheckoutTabContainer = ({ tab }: Props): ReactElement => {
  return (
    <div className="mb-6 flex text-[18px] font-light">
      <Tab active={tab === CheckoutTabType.Order}>Order</Tab>
      <FontAwesomeIcon icon={faAngleRight} className={cn('mx-5 self-center', 'text-[15px]')} />
      <Tab active={tab === CheckoutTabType.PaymentDetails}>Payment Details</Tab>
      <FontAwesomeIcon icon={faAngleRight} className={cn('mx-5 self-center', 'text-[15px]')} />
      <Tab active={tab === CheckoutTabType.Summary}>Summary</Tab>
      <FontAwesomeIcon icon={faAngleRight} className={cn('mx-5 self-center', 'text-[15px]')} />
      <Tab active={tab === CheckoutTabType.Confirmation}>Confirmation</Tab>
    </div>
  );
};
