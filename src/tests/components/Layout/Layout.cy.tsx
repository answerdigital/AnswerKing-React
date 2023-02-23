import { Button } from 'components/Buttons/Button';
import { Layout } from 'components/Layout/Layout';
import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';

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
