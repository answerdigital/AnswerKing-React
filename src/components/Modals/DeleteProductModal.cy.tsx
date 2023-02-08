import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { getExampleOrder, product } from '../../../cypress/data_helpers/component-test-data';
import { LocalOrderContext, useLocalOrder } from '../../context/OrderContext';
import { TrashIcon } from '../Icons/TrashIcon';
import { ReactElement } from 'react';

describe('Menu Product Modal', () => {
  const Wrapper = (): ReactElement => {
    const { removeProduct } = useLocalOrder();
    return <TrashIcon onClick={() => removeProduct(product)}></TrashIcon>;
  };

  beforeEach(() => {
    CustomMount(
      <LocalOrderContext.Provider value={getExampleOrder()}>
        <Wrapper />
      </LocalOrderContext.Provider>
    );
    cy.getBySel('trash-product-btn').click();
  });
  it('Should allow the user to cancel', () => {
    cy.getBySel('delete-cancel').click();
    cy.getBySel('delete-product-modal').should('not.exist');
  });
  it('Should allow the user to confirm deletion', () => {
    cy.getBySel('delete-yes').click();
  });
});
