import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import {LocalOrderDetails} from './LocalOrderDetails';
import {getExampleOrder} from '../../../cypress/data_helpers/component-test-data';
import {LocalOrderContext} from '../../context/OrderContext';

describe('Local Order Details', () => {

  beforeEach(() => {
    CustomMount(
      <LocalOrderContext.Provider value={getExampleOrder()}>
        <LocalOrderDetails></LocalOrderDetails>
      </LocalOrderContext.Provider>
    );
  });
  it('should display order information', () => {
    cy.getBySel('quantity').eq(0).should('have.text', '5');
    cy.getBySel('name').eq(0).should('have.text', 'This is a product');
    cy.getBySel('subtotal').eq(0).should('have.text', '£2,500.00');
  });
  it('should delete product upon deletion', () => {
    cy.getBySel('trash-product').eq(0).click();
  });
  it('can display multiple products', () => {
    cy.getBySel('quantity').should('have.length', 2);
    cy.getBySel('name').should('have.length', 2);
    cy.getBySel('subtotal').should('have.length', 2);
    cy.getBySel('trash-product').should('have.length', 2);
  });
});
