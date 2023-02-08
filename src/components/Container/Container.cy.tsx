import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { Container } from './Container';

describe('container', () => {
  beforeEach(() => {
    CustomMount(<Container>Container</Container>);
  });

  it('displays text', () => {
    cy.getBySel('container').should('contain', 'Container');
  });
});
