import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import {ProductsTableRow} from './ProductsTableRow';
import {product} from '../../../cypress/data_helpers/component-test-data';

describe('Create Product Form', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/products', {fixture: 'products'});
    CustomMount(
      <ProductsTableRow product={product}></ProductsTableRow>
    );
  });
  it('should display the id of the product', () => {
    cy.getBySel('product-id').should('have.text', 1);
  });
  it('should display the name of the product', () => {
    cy.getBySel('product-name').should('have.text', 'This is a product');
  });
  it('should display the price of the product', () => {
    cy.getBySel('product-price').should('have.text', '£500.00');
  });
  it('should display the description of the product', () => {
    cy.getBySel('product-description').should('have.text', 'Product');
  });

  it('should try and delete a product when delete is clicked', () => {
    cy.intercept('DELETE', '**/api/products/1', {statusCode: 204}).as('delete-product');
    cy.getBySel('delete-product').click();
    cy.wait('@delete-product');
  });
});
