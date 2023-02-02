import { CategoryFormContextProvider } from 'components/CategoryForm/CategoryFormContext';
import { CategoriesTable } from 'components/CategoriesTable/CategoriesTable';
import { ReactElement } from 'react';

export const StaffCategories = (): ReactElement => {
  return (
    <div className="flex min-h-[60vh] min-w-[40%] flex-col items-center justify-between rounded-lg bg-white p-6 text-gray-900" key="staff categories">
      <>
        <CategoryFormContextProvider>
          <CategoriesTable />
        </CategoryFormContextProvider>
      </>
    </div>
  );
};
