import { ReactElement, useContext, useState } from 'react';
import { faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'common/Buttons/Button';
import CheckboxRow from 'common/Inputs/CheckboxRow';
import Input from 'common/Inputs/Input';
import { CheckoutTabContext, CheckoutTabType } from 'context/CheckoutTabContext';
import { useLocalOrder } from 'context/OrderContext';
import CheckoutFooter from '../CheckoutFooter/CheckoutFooter';

export default function CheckoutPaymentDetailsTab(): ReactElement {
  const { setCurrentTab } = useContext(CheckoutTabContext);
  const { localOrder } = useLocalOrder();
  const [saveLater, setSaveLater] = useState(false);

  const orderExists = localOrder.lineItems?.length > 0;

  return (
    <div className="flex min-h-[65vh] w-full flex-col items-stretch">
      <div className="w-full font-normal">
        <h1 className="mb-2 text-xl font-semibold">Your details</h1>
      </div>
      <div className="mt-3 border-b-2 pb-5">
        <Input type="text" label="Order name" id="order-name" placeholder="Joe Bloggs" />
        <Input type="email" label="Email address" className="py-2" id="email-address" placeholder="joebloggs@lukewarmmail.com" />
      </div>

      <div className="mt-3 flex w-full gap-5 font-normal">
        <div className="align-center flex w-full flex-row justify-between text-xl">
          <h1 className="mb-2 font-semibold">Payment</h1>
          <div className="flex flex-row gap-1">
            <FontAwesomeIcon size="lg" icon={faCcVisa} />
            <FontAwesomeIcon size="lg" icon={faCcMastercard} />
            <FontAwesomeIcon size="lg" icon={faCcAmex} />
            <FontAwesomeIcon size="lg" icon={faCreditCard} />
          </div>
        </div>
      </div>

      <div className="mt-3 flex w-full gap-5">
        <Input type="number" label="Card number" id="card-number" placeholder="1234123412341234" />
        <Input type="number" label="Account number" id="account-number" placeholder="12341234" />
      </div>

      <div className="mt-3 flex w-full gap-5">
        <Input type="number" label="CVV number" id="cvv-number" placeholder="123" />
        <CheckboxRow label="Save for next time" checked={saveLater} onClick={() => setSaveLater(!saveLater)} />
      </div>

      <div className="mt-auto">
        <CheckoutFooter>
          <Button colour="white" className="h-[45px] w-3/12" onClick={() => setCurrentTab(CheckoutTabType.Order)}>
            Back
          </Button>
          <Button colour="yellow" className="h-[45px] w-full" onClick={() => setCurrentTab(CheckoutTabType.Summary)} disabled={!orderExists}>
            Continue to summary
          </Button>
        </CheckoutFooter>
      </div>
    </div>
  );
}
