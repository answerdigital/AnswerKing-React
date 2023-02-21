import { ProductFormContextProvider } from 'components/ProductForm/ProductFormContext';
import { ProductsTable } from 'components/ProductsTable/ProductsTable';
import { ReactElement } from 'react';

export const StaffInventory = (): ReactElement => {
  return (
    <div className="text-ak-grey-1 flex h-[60vh] w-[45%] flex-col items-center justify-between rounded-2xl bg-white p-6" key="staff inventory">
      <ProductFormContextProvider>
        <ProductsTable />
      </ProductFormContextProvider>
    </div>
  );
};
