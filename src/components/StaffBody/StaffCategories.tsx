import { ReactElement } from 'react';
import CategoriesTable from 'pages/Staff/components/CategoriesTable/CategoriesTable';
import { CategoryFormContextProvider } from 'pages/Staff/components/CategoryForm/CategoryFormContext';

export default function StaffCategories(): ReactElement {
  return (
    <div className="flex h-[60vh] w-[45%] flex-col items-center justify-between rounded-2xl bg-white p-6 text-gray-900" key="staff categories">
      <CategoryFormContextProvider>
        <CategoriesTable />
      </CategoryFormContextProvider>
    </div>
  );
}
