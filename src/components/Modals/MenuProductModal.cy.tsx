import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import {getExampleOrder, product} from '../../../cypress/data_helpers/component-test-data';
import {LocalOrderContext} from '../../context/OrderContext';
import {ProductCard} from '../ProductCard/ProductCard';

describe('Menu Product Modal', () => {

  beforeEach(() => {
    CustomMount(
      <LocalOrderContext.Provider value={getExampleOrder()}>
        <ProductCard product={product}></ProductCard>
      </LocalOrderContext.Provider>
    );
    cy.getBySel('show-product-modal').click();
  });
  it('Should display product name', () => {
    cy.getBySel('product-name').should('have.text', 'This is a product');
  });
  it('Should display product description', () => {
    cy.getBySel('product-description').should('have.text', 'Product');
  });

  it('Should display allergens', () => {
    cy.getBySel('allergens').should('contain', 'Milk');
    cy.getBySel('allergens').should('contain', 'Peanuts');
    cy.getBySel('allergens').should('contain', 'Celery');
    cy.getBySel('allergens').should('contain', 'Soy');
    cy.getBySel('allergens').should('contain', 'Gluten');
  });

  it('should display attributes of the product', () => {
    cy.getBySel('product-attributes').should('have.text', 'V, Ve, GF');
  });

  it('allow you to increase the quantity', () => {
    cy.getBySel('quantity').should('have.text', '5');
    cy.getBySel('plus-minus-button').eq(1).click();
    cy.getBySel('quantity').should('have.text', '6');
  });

  it('allow you to decrease the quantity', () => {
    cy.getBySel('quantity').should('have.text', '5');
    cy.getBySel('plus-minus-button').eq(0).click();
    cy.getBySel('quantity').should('have.text', '4');
  });

  it('allow you to close the modal', () => {
    cy.getBySel('cancel-button').click();
    cy.getBySel('menu-product-modal').should('not.exist');
  });
});
