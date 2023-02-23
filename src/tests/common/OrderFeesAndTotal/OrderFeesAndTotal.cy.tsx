import { OrderFeesAndTotals } from 'common/OrderFeesAndTotals/OrderFeesAndTotals';
import { lineItemList } from '../../../../cypress/data_helpers/component-test-data';
import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';

describe('Order Fees and Totals', () => {
  beforeEach(() => {
    CustomMount(<OrderFeesAndTotals lineItems={lineItemList}></OrderFeesAndTotals>);
  });
  it('should show the service change with the total amount', () => {
    cy.getBySel('service-charge').should('contain', '0.50');
  });

  it('should show the combined price of all products with the service charge', () => {
    cy.getBySel('total').should('contain', '£3,250.50');
  });
});
