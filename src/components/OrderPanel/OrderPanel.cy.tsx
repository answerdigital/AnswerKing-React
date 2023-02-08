import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { getExampleOrder } from '../../../cypress/data_helpers/component-test-data';
import { OrderPanel } from './OrderPanel';
import { LocalOrderContext } from 'context/OrderContext';

describe('Order Panel', () => {
  beforeEach(() => {
    CustomMount(
      <LocalOrderContext.Provider value={getExampleOrder()}>
        <OrderPanel></OrderPanel>
      </LocalOrderContext.Provider>
    );
  });
  it('should be able to navigate to Allergen Board', () => {
    cy.getBySel('allergen-board-btn').click();
    cy.url().should('contain', 'allergen');
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