import OrderDetails from 'pages/Checkout/components/OrderDetails/OrderDetails';
import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';
import { lineItemList } from '../../../../../../cypress/data_helpers/component-test-data';

describe('Order Details', () => {
  beforeEach(() => {
    CustomMount(<OrderDetails items={lineItemList} />);
  });
  it('should display quantity', () => {
    cy.getBySel('quantity').should('be.visible');
  });
  it('should display name', () => {
    cy.getBySel('item-name').eq(0).should('have.text', 'This is a product');
  });
  it('should display trash-icon', () => {
    cy.getBySel('trash-product-btn').should('be.visible');
  });
  it('should display price', () => {
    cy.getBySel('item-subtotal').eq(0).should('have.text', '£2,500.00');
  });
});
