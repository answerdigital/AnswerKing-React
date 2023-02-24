import { LocalOrderContext } from 'context/OrderContext';
import OrderPanel from 'pages/Menu/components/OrderPanel/OrderPanel';
import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';
import { getExampleOrder } from '../../../../../../cypress/data_helpers/component-test-data';

describe('Order Panel', () => {
  beforeEach(() => {
    CustomMount(
      <LocalOrderContext.Provider value={getExampleOrder()}>
        <OrderPanel />
      </LocalOrderContext.Provider>
    );
  });
  it('should display local order details', () => {
    cy.getBySel('local-order-details').should('be.visible');
  });
  it('should display create order form', () => {
    cy.getBySel('order-create-form').should('be.visible');
  });
  it('should contain link home', () => {
    cy.getBySel('local-order-details').should('be.visible');
  });
});
