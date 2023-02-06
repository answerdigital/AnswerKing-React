import { CheckoutTabContainer } from 'components/CheckoutTabContainer/CheckoutTabContainer';
import { CheckoutConfirmationTab } from 'components/CheckoutTabs/CheckoutConfirmationTab';
import { CheckoutOrderTab } from 'components/CheckoutTabs/CheckoutOrderTab';
import { CheckoutPaymentDetailsTab } from 'components/CheckoutTabs/CheckoutPaymentDetailsTab';
import { CheckoutSummaryTab } from 'components/CheckoutTabs/CheckoutSummaryTab';
import { PageLayout } from 'components/PageLayout/PageLayout';
import { ReactElement, useState } from 'react';
import { CheckoutTabContext, CheckoutTabType } from 'context/CheckoutTabContext';

export const CheckoutPage = (): ReactElement => {
  const [currentTab, setCurrentTab] = useState<CheckoutTabType>(CheckoutTabType.Order);

  return (
    <PageLayout title={'Checkout - Answer King'}>
      <div className="font-poppins flex flex-col items-center">
        <div className="mt-10 mb-5 items-center text-[40px] font-[300] leading-[54px]">Checkout</div>
        <CheckoutTabContainer tab={currentTab} />
        <form
          className="h-1 min-h-[65vh] w-[80vw] rounded-[16px] bg-white p-[24px] text-[#333F4C] md:w-[65vw] lg:w-[50vw] xl:w-[35vw]"
          onSubmit={(e) => e.preventDefault()}
        >
          <CheckoutTabContext.Provider value={{ currentTab, setCurrentTab }}>
            {{
              [CheckoutTabType.Order]: <CheckoutOrderTab />,
              [CheckoutTabType.PaymentDetails]: <CheckoutPaymentDetailsTab />,
              [CheckoutTabType.Summary]: <CheckoutSummaryTab />,
              [CheckoutTabType.Confirmation]: <CheckoutConfirmationTab />,
            }[currentTab] || 'Tab not found'}
          </CheckoutTabContext.Provider>
        </form>
      </div>
    </PageLayout>
  );
};
