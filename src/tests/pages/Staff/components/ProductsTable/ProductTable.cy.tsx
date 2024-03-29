import { SearchContextProvider } from 'common/Search/SearchContext';
import ProductsTable from 'pages/Staff/components/ProductsTable/ProductsTable';
import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';

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
