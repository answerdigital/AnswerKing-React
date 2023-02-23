import { CheckoutPage } from 'pages/Checkout/Checkout';
import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';

describe('Checkout Page Tests', () => {
  it('mounts', () => {
    CustomMount(<CheckoutPage />);
  });
});
