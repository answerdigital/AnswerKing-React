import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { getExampleOrder } from '../../../cypress/data_helpers/component-test-data';
import { LocalOrderContext } from 'context/OrderContext';
import { ProductForm } from './ProductForm';
import { ProductFormContextProvider } from './ProductFormContext';
import { ToastContainer } from 'react-toastify';

describe('Create Product Form', () => {
  beforeEach(() => {
    CustomMount(
      <>
        <ToastContainer />
        <LocalOrderContext.Provider value={getExampleOrder()}>
          <ProductFormContextProvider>
            <ProductForm />
          </ProductFormContextProvider>
        </LocalOrderContext.Provider>
      </>
    );
  });
  it('must require a name for a product', () => {
    cy.getBySel('product-price').type('10');
    cy.getBySel('product-description').type('description');
    cy.getBySel('submit-product').click();
    cy.get('li').should('contain', 'Name is required, cannot contain special characters and must be less than 50 characters in length.');
  });

  it('must require a description', () => {
    cy.getBySel('product-price').type('10');
    cy.getBySel('product-name').type('name');
    cy.getBySel('submit-product').click();
    cy.get('li').should('contain', 'Description is required and must be less than 500 characters in length.');
  });
});
