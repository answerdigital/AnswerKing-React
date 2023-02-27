import { ReactElement } from 'react';
import TrashIcon from 'common/Icons/TrashIcon';
import { LocalOrderContext, useLocalOrder } from 'context/OrderContext';
import { getExampleOrder, product } from '../../../../cypress/data_helpers/component-test-data';
import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';

describe('Menu Product Modal', () => {
  const Wrapper = (): ReactElement => {
    const { removeProduct } = useLocalOrder();
    return <TrashIcon onClick={() => removeProduct(product)} />;
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
