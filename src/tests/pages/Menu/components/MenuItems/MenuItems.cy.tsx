import { LocalOrderContext } from 'context/OrderContext';
import MenuItems from 'pages/Menu/components/MenuItems/MenuItems';
import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';
import { getExampleOrder, products } from '../../../../../../cypress/data_helpers/component-test-data';

describe('Local Order Details', () => {
  beforeEach(() => {
    CustomMount(
      <LocalOrderContext.Provider value={getExampleOrder()}>
        <MenuItems products={products} />
      </LocalOrderContext.Provider>
    );
  });
  it('Should display multiple product cards', () => {
    cy.getBySel('product-card').should('have.length', 2);
  });
});
