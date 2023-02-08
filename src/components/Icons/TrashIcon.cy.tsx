import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { TrashIcon } from './TrashIcon';
import { getExampleOrder, product } from '../../../cypress/data_helpers/component-test-data';
import { LocalOrderContext, useLocalOrder } from '../../context/OrderContext';

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
