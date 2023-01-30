import { Button } from 'components/Button/Button';
import { ProductForm } from 'components/ProductCreateForm/ProductForm';
import { ProductFormContextProvider, useProductFormContext } from 'components/ProductCreateForm/ProductFormContext';
import { ProductsTable } from 'components/ProductsTable/ProductsTable';
import { Search } from 'components/Search/Search';
import { SearchContextProvider } from 'components/Search/SearchContext';
import { ReactElement, useState } from 'react';

export const StaffInventory = (): ReactElement => {
  return (
    <div className="flex min-h-[60vh] w-[40%] flex-col items-center justify-between rounded-lg bg-white p-6 text-gray-900" key="staff inventory">
      <>
        <SearchContextProvider>
          <ProductFormContextProvider>
            <ProductsTable />
          </ProductFormContextProvider>
        </SearchContextProvider>
      </>
    </div>
  );
};
