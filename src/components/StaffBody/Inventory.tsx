import { Button } from 'components/Button/Button';
import { ProductsTable } from 'components/ProductsTable/ProductsTable';
import { Search } from 'components/Search/Search';
import { SearchContextProvider } from 'components/Search/SearchContext';
import { ReactElement } from 'react';

export const StaffInventory = (): ReactElement => {
  return (
    <div className="flex min-h-[65vh] min-w-[50%] flex-col items-center justify-between rounded-lg bg-white p-6 text-gray-900">
      <SearchContextProvider>
        <ProductsTable />
        <div className="flex w-full flex-none justify-between">
          <Search className="w-1/2">Search Item</Search>
          <Button className="w-1/2" colour="yellow" size="small">
            Add Item
          </Button>
        </div>
      </SearchContextProvider>
    </div>
  );
};
