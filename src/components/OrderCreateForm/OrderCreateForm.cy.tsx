import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { OrderCreateForm } from './OrderCreateForm';
import { LocalOrderContext } from '../../context/OrderContext';
import { getExampleOrder } from '../../../cypress/data_helpers/component-test-data';

describe('Local Order Details', () => {
  describe('no products', () => {
    beforeEach(() => {
      CustomMount(<OrderCreateForm></OrderCreateForm>);
    });
    it('Should be able to perform login', () => {
      cy.getBySel('checkout').should('be.disabled');
    });
    it('should calculate at 0 total', () => {
      cy.getBySel('total-amount').should('have.text', '£0.00');
    });
  });

  describe('with products', () => {
    beforeEach(() => {
      CustomMount(
        <LocalOrderContext.Provider value={getExampleOrder()}>
          <OrderCreateForm></OrderCreateForm>
        </LocalOrderContext.Provider>
      );
    });
    it('should calculate the total of all products', () => {
      cy.getBySel('total-amount').should('have.text', '£3,250.00');
    });
    it('should display the service charge', () => {
      cy.getBySel('service-charge').should('have.text', '£0.50');
    });
    it('Should be able to proceed to checkout', () => {
      cy.getBySel('checkout').click();
      cy.url().should('contains', 'checkout');
    });
  });
});
