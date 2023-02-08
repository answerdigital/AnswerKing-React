import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';

import { Layout } from './Layout';
import { Button } from '../Buttons/Button';

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
