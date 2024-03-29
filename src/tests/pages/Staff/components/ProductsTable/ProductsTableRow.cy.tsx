import ProductsTableRow from 'pages/Staff/components/ProductsTable/ProductsTableRow';
import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';
import { product } from '../../../../../../cypress/data_helpers/component-test-data';

describe('Create Product Form', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/products', { fixture: 'products' });
    CustomMount(<ProductsTableRow product={product} />);
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
});
