import { ReactElement } from 'react';
import { ProductFormContextProvider } from 'pages/Staff/components/ProductForm/ProductFormContext';
import ProductsTable from 'pages/Staff/components/ProductsTable/ProductsTable';

export default function StaffInventory(): ReactElement {
  return (
    <div className="flex h-[60vh] w-[45%] flex-col items-center justify-between rounded-2xl bg-white p-6 text-gray-900" key="staff inventory">
      <ProductFormContextProvider>
        <ProductsTable />
      </ProductFormContextProvider>
    </div>
  );
}
