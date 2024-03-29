import { ReactElement } from 'react';
import CategoriesTable from '../CategoriesTable/CategoriesTable';
import { CategoryFormContextProvider } from '../CategoryForm/CategoryFormContext';

export default function StaffCategories(): ReactElement {
  return (
    <div className="text-ak-grey-1 flex h-[60vh] w-[45%] flex-col items-center justify-between rounded-2xl bg-white p-6" key="staff categories">
      <CategoryFormContextProvider>
        <CategoriesTable />
      </CategoryFormContextProvider>
    </div>
  );
}
