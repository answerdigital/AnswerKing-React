context('this does something', () => {
  before(() => {
    cy.visit('http://localhost:5173');
  });

  it('should create a contract upon utilizing an API mock', () => {
    cy.setupPact('answer-king-ui', 'answer-king-api');
    cy.intercept('GET', '**/api/categories', { fixture: 'categories_example.json' }).as('categories');
    cy.get('[data-testid=order]').click();
  });

  after(() => {
    cy.usePactWait(['categories']);
  });
});

export {};
