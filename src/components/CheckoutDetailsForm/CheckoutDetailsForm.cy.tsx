import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { CheckoutDetailsForm } from './CheckoutDetailsForm';
import { LocalOrderContext } from '../../context/OrderContext';
import { getExampleOrder } from '../../../cypress/data_helpers/component-test-data';
import { BrowserRouter } from 'react-router-dom';

describe('Checkout Details Form', () => {
  describe('empty', () => {
    beforeEach(() => {
      CustomMount(<CheckoutDetailsForm></CheckoutDetailsForm>);
    });

    it('should not let you continue', () => {
      cy.getBySel('confirm-and-continue').should('be.disabled');
    });

    it('Displays Checkout Details Tabs', () => {
      cy.getBySel('no-products-msg').contains('Whoa, you\'ve not got anything in your order yet');
    });

    it('allows you to navigate to menu via the menu button', () => {
      cy.getBySel('nav-to-menu').click();
      cy.url().should('contain', 'menu');
    });

    it('allows you to navigate back', () => {
      cy.getBySel('back-button').click();
      cy.url().should('contain', 'menu');
    });
  });

  describe('populated', () => {
    beforeEach(() => {
      cy.mount(
        <LocalOrderContext.Provider value={getExampleOrder()}>
          <BrowserRouter>
            <CheckoutDetailsForm></CheckoutDetailsForm>
          </BrowserRouter>
        </LocalOrderContext.Provider>
      );
    });

    it('should display products', () => {
      cy.getBySel('order-details').should('be.visible');
    });

    it('should show the service change with the total amount', () => {
      cy.getBySel('total').should('contain', '0.50');
    });

    it('should show the combined price of all products with the service charge', () => {
      cy.getBySel('total').should('contain', '£3,250.50');
    });

    it('should allow you to confirm and continue', () => {
      cy.getBySel('confirm-and-continue').click();
      //No Behaviour programmed in yet
    });
  });
});
