import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { CheckoutDetailsTabs } from './CheckoutDetailsTabs';

describe('Checkout Detail Tabs', () => {
  beforeEach(() => {
    CustomMount(<CheckoutDetailsTabs></CheckoutDetailsTabs>);
  });

  it('Displays the expected tabs', () => {
    cy.getBySel('order-tab').should('be.visible');
    cy.getBySel('payment-tab').should('be.visible');
    cy.getBySel('summary-tab').should('be.visible');
    cy.getBySel('confirmation-tab').should('be.visible');
  });
});
