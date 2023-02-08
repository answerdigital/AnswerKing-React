import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { Footer } from './Footer';

describe('Footer', () => {
  beforeEach(() => {
    CustomMount(<Footer></Footer>);
  });

  it('links to allergen board', () => {
    cy.getBySel('allergen-board-link').click();
    cy.url().should('contain', 'allergen');
  });

  it('links to langauges', () => {
    cy.getBySel('languages-link').click();
    cy.url().should('contain', 'language');
  });

  it('links to policies', () => {
    cy.getBySel('policies-link').click();
    cy.url().should('contain', 'policy');
  });
});