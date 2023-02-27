import HomePage from 'pages/Home/Home';
import PageRoutes from 'utilities/Constants/PageRoutes';
import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';

describe('HomePage tests', () => {
  it('mounts', () => {
    CustomMount(<HomePage />);
  });

  it('Navigates to menu when "Menu" button is clicked', () => {
    CustomMount(<HomePage />);

    cy.get('button').contains('Order Now').click();
    cy.location('pathname').should('contain', PageRoutes.MENU);
  });
});
