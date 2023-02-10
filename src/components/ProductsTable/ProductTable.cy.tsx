import { SearchContextProvider } from 'components/Search/SearchContext';
import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { ProductsTable } from './ProductsTable';

describe('Create Product Form', () => {
  beforeEach(() => {
    CustomMount(
      <SearchContextProvider>
        <ProductsTable />
      </SearchContextProvider>
    );
    cy.intercept('GET', '**/api/products', { fixture: 'products' });
  });
  it('must display product data', () => {
    cy.getBySel('products-data-row').should('be.visible');
  });
});
