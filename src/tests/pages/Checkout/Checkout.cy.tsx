import CheckoutPage from 'pages/Checkout/Checkout';
import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';

describe('Checkout Page Tests', () => {
  it('mounts', () => {
    CustomMount(<CheckoutPage />);
  });
});
