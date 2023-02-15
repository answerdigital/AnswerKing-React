import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components/Buttons/Button';
import { InputRow } from 'components/Inputs/InputRow';
import { CheckoutTabContext, CheckoutTabType } from 'context/CheckoutTabContext';
import { useLocalOrder } from 'context/OrderContext';
import { useContext, useState } from 'react';
import { CheckboxRow } from 'components/Inputs/CheckboxRow';
import { CheckoutFooter } from 'components/CheckoutFooter/CheckoutFooter';

export const CheckoutPaymentDetailsTab = (): React.ReactElement => {
  const { setCurrentTab } = useContext(CheckoutTabContext);
  const { localOrder } = useLocalOrder();
  const [saveLater, setSaveLater] = useState(false);

  const orderExists = localOrder.lineItems?.length > 0;

  return (
    <div className="flex h-full w-full flex-col">
      <div className="w-full gap-5 font-[400]">
        <div className="w-full">
          <h1 className="mb-4 text-[20px] font-[600]">Your details</h1>
        </div>

        <div className="flex w-full gap-5">
          <InputRow type="text" label="Order name" placeholder="Joe Bloggs" />
          <InputRow type="email" label="Email address" placeholder="joebloggs@lukewarmmail.com" />
        </div>
      </div>

      <div className="mt-12 flex w-full gap-5 font-[400]">
        <div className="align-center flex w-full flex-row justify-between">
          <h1 className="mb-4 text-[20px] font-[600]">Payment</h1>
          <div className="flex flex-row gap-1 text-[24px]">
            <FontAwesomeIcon icon={faCcVisa} />
            <FontAwesomeIcon icon={faCcMastercard} />
            <FontAwesomeIcon icon={faCcAmex} />
            <FontAwesomeIcon icon={faCreditCard} />
          </div>
        </div>
      </div>

      <div className="flex w-full gap-5">
        <InputRow type="number" label="Card number" placeholder="1234123412341234" />
        <InputRow type="number" label="Account number" placeholder="12341234" />
      </div>

      <div className="mt-5 flex w-full gap-5">
        <InputRow type="number" label="CVV number" placeholder="123" />
        <CheckboxRow label="Save for next time" checked={saveLater} onClick={() => setSaveLater(!saveLater)} />
      </div>

      <CheckoutFooter>
        <Button colour="white" className="w-3/12 h-[45px]" onClick={() => setCurrentTab(CheckoutTabType.Order)}>
          Back
        </Button>
        <Button colour="yellow" className="w-full h-[45px]" onClick={() => setCurrentTab(CheckoutTabType.Summary)} disabled={!orderExists}>
          Continue to summary
        </Button>
      </CheckoutFooter>
    </div>
  );
};
