/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Get DOM element by data-test attribute.
     *
     * @param {string} selector - The data-test attribute of the target DOM element.
     * @return {HTMLElement} - Target DOM element
     */
    getBySel(value: string): Chainable<Subject>,
    mount: typeof mount;
  }
}
