import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import {getExampleOrder, product} from '../../../cypress/data_helpers/component-test-data';
import { LocalOrderContext } from 'context/OrderContext';
import {ProductCard} from './ProductCard';

describe('Order Panel', () => {
  beforeEach(() => {
    CustomMount(
      <LocalOrderContext.Provider value={getExampleOrder()}>
        <ProductCard product={product}></ProductCard>
      </LocalOrderContext.Provider>
    );
  });
  it('should try and add the product to the order when "Add to Product" button is clicked', () => {
    cy.getBySel('add-to-order-btn').click();
  });
  it('should display product name', () => {
    cy.getBySel('product-name').should('have.text', 'This is a product');
  });

  it('should display product description', () => {
    cy.getBySel('product-description').should('have.text', 'Product');
  });
  it('should display product price', () => {
    cy.getBySel('price').should('have.text', '£500');
  });
});
