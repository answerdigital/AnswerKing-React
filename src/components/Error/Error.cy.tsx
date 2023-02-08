import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { Error } from './Error';

describe('Errors', () => {
  beforeEach(() => {
    CustomMount(<Error>This is an error</Error>);
  });

  it('displays the error', () => {
    cy.getBySel('error-list').should('have.text', 'This is an error');
  });

  it('can be cleared from view by clicking', () => {
    //Note: There is no interactable element that can be clicked to dismiss the component!
  });
});
