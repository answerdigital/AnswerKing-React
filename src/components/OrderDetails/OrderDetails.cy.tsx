import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import {lineItemList} from '../../../cypress/data_helpers/component-test-data';
import {OrderDetails} from './OrderDetails';

describe('Order Details', () => {
  beforeEach(() => {
    CustomMount(
      <OrderDetails items={lineItemList}></OrderDetails>
    );
  });
  it('should display quantity', () => {
    cy.getBySel('item-quantity').eq(0).should('have.text', '5');
  });
  it('should display name', () => {
    cy.getBySel('item-name').eq(0).should('have.text', 'This is a product');
  });
  it('should display trash-icon', () => {
    cy.getBySel('delete-product-btn').should('be.visible');
  });
  it('should display price', () => {
    cy.getBySel('item-subtotal').eq(0).should('have.text', '£2,500.00');
  });
});
