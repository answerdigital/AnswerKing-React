import { Button } from 'components/Button/Button';
import { ProductCreateForm } from 'components/ProductCreateForm/ProductCreateForm';
import { ProductsTable } from 'components/ProductsTable/ProductsTable';
import { Search } from 'components/Search/Search';
import { SearchContextProvider } from 'components/Search/SearchContext';
import { ReactElement, useState } from 'react';

export const StaffInventory = (): ReactElement => {
  const [modalOpen, SetModalOpen] = useState<boolean>(false);

  return (
    <div className="flex min-h-[60vh] w-[40%] flex-col items-center justify-between rounded-lg bg-white p-6 text-gray-900" key="staff inventory">
      <SearchContextProvider>
        {modalOpen ? (
          <>
            <ProductCreateForm />
            <div className="flex w-full flex-none justify-between">
              <Button className="h-14 w-1/2" colour="yellow" size="small" onClick={() => SetModalOpen(!modalOpen)}>
                Cancel
              </Button>
              <Button className="h-14 w-1/2" colour="yellow" size="small">
                Save Item
              </Button>
            </div>
          </>
        ) : (
          <>
            <ProductsTable />
            <div className="flex w-full flex-none justify-between">
              <Search className="h-14 w-1/2">Search Item</Search>
              <Button className="h-14 w-1/2" colour="yellow" size="small" onClick={() => SetModalOpen(!modalOpen)}>
                Add Item
              </Button>
            </div>
          </>
        )}
      </SearchContextProvider>
    </div>
  );
};
