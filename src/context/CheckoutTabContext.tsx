import { createContext } from 'react';

export enum CheckoutTabType {
  Order,
  PaymentDetails,
  Summary,
  Confirmation,
}

interface CheckoutTab {
  currentTab: CheckoutTabType;
  setCurrentTab: React.Dispatch<React.SetStateAction<CheckoutTabType>>;
}

export const CheckoutTabContext = createContext<CheckoutTab>({
  currentTab: CheckoutTabType.Order,
  setCurrentTab: () => null,
});
