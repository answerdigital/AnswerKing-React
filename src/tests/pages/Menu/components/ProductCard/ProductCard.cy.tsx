import { LocalOrderContext } from 'context/OrderContext';
import { ProductCard } from 'pages/Menu/components/ProductCard/ProductCard';
import { getExampleOrder, longDescriptionProduct, product } from '../../../../../../cypress/data_helpers/component-test-data';
import CustomMount from '../../../../testHelpers/cypressHelpers/CustomMount';

describe('Order Panel', () => {
  describe('Regular description', () => {
    beforeEach(() => {
      CustomMount(
        <LocalOrderContext.Provider value={getExampleOrder()}>
          <ProductCard product={product}></ProductCard>
        </LocalOrderContext.Provider>
      );
    });
    it('should try and add the product to the order when "Add to Product" button is clicked', () => {
      cy.getBySel('product-card').click();
      cy.getBySel('menu-product-modal').should('be.visible');
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
  describe('Order Panel with long description', () => {
    beforeEach(() => {
      CustomMount(
        <LocalOrderContext.Provider value={getExampleOrder()}>
          <ProductCard product={longDescriptionProduct}></ProductCard>
        </LocalOrderContext.Provider>
      );
    });

    it('should truncate a long description', () => {
      cy.getBySel('product-description').should('contain', '...');
    });
  });
});
