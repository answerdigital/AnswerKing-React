import CheckoutPage from './Checkout';
import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';

describe('Checkout Page Tests', () => {
  it('mounts', () => {
    CustomMount(<CheckoutPage />);
  });
});
