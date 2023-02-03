import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { Badge } from './Badge';

describe('Badge', () => {
  before(() => {
    CustomMount(<Badge background={'bg-[#333F4C]'}>Badge</Badge>);
  });

  it('Displays Text', () => {
    cy.getBySel('Badge').should('have.text', 'Badge');
  });
});
