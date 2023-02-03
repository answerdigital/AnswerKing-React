import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { CheckoutDetails } from './CheckoutDetails';

describe('Checkout Details', () => {
  beforeEach(() => {
    CustomMount(<CheckoutDetails></CheckoutDetails>);
  });

  it('Displays Checkout Details Tabs', () => {
    cy.getBySel('checkout-details-tab').should('be.visible');
  });

  it('Displays Checkout Details Form', () => {
    cy.getBySel('checkout-details-form').should('be.visible');
  });
});
