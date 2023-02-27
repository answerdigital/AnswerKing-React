import { LocalOrderContext } from 'context/OrderContext';
import OrderCreateForm from 'pages/Menu/components/OrderCreateForm/OrderCreateForm';
import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';
import { getExampleOrder } from '../../../../../../cypress/data_helpers/component-test-data';

describe('Local Order Details', () => {
  describe('with products', () => {
    beforeEach(() => {
      CustomMount(
        <LocalOrderContext.Provider value={getExampleOrder()}>
          <OrderCreateForm />
        </LocalOrderContext.Provider>
      );
    });
    it('should display the order fees and total', () => {
      cy.getBySel('order-fees-totals').should('be.visible');
    });
    it('Should be able to proceed to checkout', () => {
      cy.getBySel('checkout').click();
      cy.url().should('contains', 'checkout');
    });
  });
});
