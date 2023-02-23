import { HomePage } from 'pages/Home/Home';
import { RouteConstants } from 'utilities/route-constants';
import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';

describe('HomePage tests', () => {
  it('mounts', () => {
    CustomMount(<HomePage />);
  });

  it('Navigates to menu when "Menu" button is clicked', () => {
    CustomMount(<HomePage />);

    cy.get('button').click();
    cy.location('pathname').should('contain', RouteConstants.MENU);
  });
});
