import { ProductFormContextProvider } from 'components/ProductCreateForm/ProductFormContext';
import { ProductsTable } from 'components/ProductsTable/ProductsTable';
import { ReactElement } from 'react';

export const StaffInventory = (): ReactElement => {
  return (
    <div className="flex min-h-[60vh] w-[40%] flex-col items-center justify-between rounded-lg bg-white p-6 text-gray-900" key="staff inventory">
      <>
        <ProductFormContextProvider>
          <ProductsTable />
        </ProductFormContextProvider>
      </>
    </div>
  );
};
