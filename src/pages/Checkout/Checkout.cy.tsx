import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';
import CheckoutPage from './Checkout';

describe('Checkout Page Tests', () => {
  it('mounts', () => {
    CustomMount(<CheckoutPage />);
  });
});
