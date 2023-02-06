import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import {getExampleOrder} from '../../../cypress/data_helpers/component-test-data';
import { LocalOrderContext } from 'context/OrderContext';
import { ProductCreateForm } from './ProductCreateForm';

describe('Create Product Form', () => {
  beforeEach(() => {
    CustomMount(
      <LocalOrderContext.Provider value={getExampleOrder()}>
        <ProductCreateForm></ProductCreateForm>
      </LocalOrderContext.Provider>
    );
  });
  it('must require a name for a product', () => {
    cy.getBySel('product-price').type('10');
    cy.getBySel('product-description').type('description');
    cy.getBySel('submit-product').click();
    cy.getBySel('error-message').should('contain', 'Name is required, cannot contain special characters and must be less than 50 characters in length.');
  });

  it('must require a description', () => {
    cy.getBySel('product-price').type('10');
    cy.getBySel('product-name').type('name');
    cy.getBySel('submit-product').click();
    cy.getBySel('error-message').should('contain', 'Description is required and must be less than 500 characters in length.');
  });

  it('should be able to submitted to create a product', () => {
    cy.intercept('POST', '**/api/products').as('productPost');
    cy.getBySel('product-price').type('10');
    cy.getBySel('product-description').type('description');
    cy.getBySel('product-name').type('name');
    cy.getBySel('submit-product').click();

    cy.wait('@productPost');
    cy.get('@productPost').its('request.body').should('have.property', 'name', 'name');
    cy.get('@productPost').its('request.body').should('have.property', 'description', 'description');
    cy.get('@productPost').its('request.body').should('have.property', 'price', 0.001);
  });
});
