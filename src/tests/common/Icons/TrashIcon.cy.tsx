import { TrashIcon } from 'common/Icons/TrashIcon';
import { LocalOrderContext, useLocalOrder } from 'context/OrderContext';
import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';
import { getExampleOrder, product } from '../../../../cypress/data_helpers/component-test-data';

describe('Footer', () => {
  const order = getExampleOrder();

  beforeEach(() => {
    CustomMount(
      <LocalOrderContext.Provider value={order}>
        <TrashIcon onClick={() => useLocalOrder().removeProduct(product)}></TrashIcon>
      </LocalOrderContext.Provider>
    );
  });

  it('should try and delete the product', () => {
    cy.getBySel('trash-product-btn').click();
  });
});
