import { Button } from 'components/Button/Button';
import { ProductForm } from 'components/ProductCreateForm/ProductForm';
import { ProductFormContextProvider, useProductFormContext } from 'components/ProductCreateForm/ProductFormContext';
import { ProductsTable } from 'components/ProductsTable/ProductsTable';
import { Search } from 'components/Search/Search';
import { SearchContextProvider } from 'components/Search/SearchContext';
import { ReactElement, useState } from 'react';

export const StaffInventory = (): ReactElement => {
  const newForm = useProductFormContext().startNew;
  const closeForm = useProductFormContext().closeForm;
  const saveForm = useProductFormContext().saveForm;
  const formOpen = useProductFormContext().formOpen;

  return (
    <div className="flex min-h-[60vh] w-[40%] flex-col items-center justify-between rounded-lg bg-white p-6 text-gray-900" key="staff inventory">
      {formOpen ? (
        <>
          <ProductForm />
          <div className="flex w-full flex-none justify-between">
            <Button className="h-14 w-1/2" colour="yellow" size="small" onClick={() => closeForm()}>
              Cancel
            </Button>
            <Button className="h-14 w-1/2" colour="yellow" size="small" onClick={() => saveForm()}>
              Save Item
            </Button>
          </div>
        </>
      ) : (
        <>
          <ProductsTable />
          <div className="flex w-full flex-none justify-between">
            <Search className="h-14 w-1/2">Search Item</Search>
            <Button className="h-14 w-1/2" colour="yellow" size="small" onClick={() => newForm}>
              Add Item
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
