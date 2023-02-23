import { Navigation } from 'components/Navigation/Navigation';
import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';

describe('Local Order Details', () => {
  beforeEach(() => {
    CustomMount(<Navigation></Navigation>);
  });
  it('Should be able to perform login', () => {
    cy.getBySel('login-button').click();
  });
  it('should be able to navigate to Allergen Board', () => {
    cy.getBySel('allergen-board-btn').click();
    cy.url().should('contain', 'allergen');
  });
});
