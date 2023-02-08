import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { Navigation } from './Navigation';

describe('Local Order Details', () => {
  beforeEach(() => {
    CustomMount(<Navigation></Navigation>);
  });
  it('Should be able to perform login', () => {
    cy.getBySel('login-button').click();
  });
});
