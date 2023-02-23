import { LocalOrderContext } from 'context/OrderContext';
import CustomMount from 'testHelpers/cypressHelpers/CustomMount';
import { getExampleOrder } from '../../../../../cypress/data_helpers/component-test-data';
import { LocalOrderDetails } from './LocalOrderDetails';

describe('Local Order Details', () => {
  beforeEach(() => {
    CustomMount(
      <LocalOrderContext.Provider value={getExampleOrder()}>
        <LocalOrderDetails></LocalOrderDetails>
      </LocalOrderContext.Provider>
    );
  });
  it('should display the products quantity', () => {
    cy.getBySel('quantity').eq(0).should('be.visible');
  });
  it('should display the products name', () => {
    cy.getBySel('name').eq(0).should('have.text', 'This is a product');
  });
  it('should display the products subtotal', () => {
    cy.getBySel('subtotal').eq(0).should('have.text', '£2,500.00');
  });
  it('should display the trash icon', () => {
    cy.getBySel('trash-product-btn').should('be.visible');
  });

  it('can display multiple products', () => {
    cy.getBySel('product-row').should('have.length', 2);
  });
});
