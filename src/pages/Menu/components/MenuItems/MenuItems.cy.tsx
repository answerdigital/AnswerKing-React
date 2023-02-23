import { MenuItems } from './MenuItems';
import { getExampleOrder, products } from '../../../../../cypress/data_helpers/component-test-data';
import { LocalOrderContext } from 'context/OrderContext';
import CustomMount from 'testHelpers/cypressHelpers/CustomMount';

describe('Local Order Details', () => {
  beforeEach(() => {
    CustomMount(
      <LocalOrderContext.Provider value={getExampleOrder()}>
        <MenuItems products={products}></MenuItems>
      </LocalOrderContext.Provider>
    );
  });
  it('Should display multiple product cards', () => {
    cy.getBySel('product-card').should('have.length', 2);
  });
});
