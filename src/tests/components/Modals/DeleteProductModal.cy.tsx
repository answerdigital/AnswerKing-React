import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { ReactElement } from 'react';
import { LocalOrderContext, useLocalOrder } from 'context/OrderContext';
import { TrashIcon } from 'components/Icons/TrashIcon';
import { getExampleOrder, product } from '../../../../cypress/data_helpers/component-test-data';

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
