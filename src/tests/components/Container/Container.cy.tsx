import { Container } from 'components/Container/Container';
import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';

describe('container', () => {
  beforeEach(() => {
    CustomMount(<Container>Container</Container>);
  });

  it('displays text', () => {
    cy.getBySel('container').should('contain', 'Container');
  });
});
