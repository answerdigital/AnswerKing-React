import { Button } from 'common/Buttons/Button';
import { Layout } from 'common/Layout/Layout';
import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';

describe('Layout', () => {
  beforeEach(() => {
    CustomMount(
      <Layout>
        <Button>Button</Button>
      </Layout>
    );
  });

  it('shows navigation', () => {
    cy.getBySel('navigation').should('be.visible');
  });
});
