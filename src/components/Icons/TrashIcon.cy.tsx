import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import {TrashIcon} from './TrashIcon';
import {getExampleOrder, product} from '../../../cypress/data_helpers/component-test-data';
import {LocalOrderContext} from '../../context/OrderContext';

describe('Footer', () => {

  const order = getExampleOrder();

  beforeEach(() => {
    CustomMount(
      <LocalOrderContext.Provider value={order}>
        <TrashIcon product={product}></TrashIcon>
      </LocalOrderContext.Provider>);
  });

  it('should try and delete the product', () => {
    cy.getBySel('delete-product-btn').click();
  });
});
