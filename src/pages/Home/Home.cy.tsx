import { RouteConstants } from 'utilities/route-constants';
import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import HomePage from './Home';

describe('HomePage tests', () => {
  it('mounts', () => {
    CustomMount(<HomePage />);
  });

  it('Navigates to meny when "Menu" button is clicked', () => {
    CustomMount(<HomePage />);

    cy.get('button').click();
    cy.location('pathname').should('contain', RouteConstants.MENU);
  });
});
