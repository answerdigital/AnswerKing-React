import Container from 'common/Container/Container';
import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';

describe('container', () => {
  beforeEach(() => {
    CustomMount(<Container>Container</Container>);
  });

  it('displays text', () => {
    cy.getBySel('container').should('contain', 'Container');
  });
});
