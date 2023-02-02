import { TagFormContextProvider } from 'components/TagForm/TagFormContext';
import { TagsTable } from 'components/TagsTable/TagsTable';
import { ReactElement } from 'react';

export const StaffTags = (): ReactElement => {
  return (
    <div className="flex min-h-[60vh] min-w-[40%] flex-col items-center justify-between rounded-lg bg-white p-6 text-gray-900" key="staff tags">
      <>
        <TagFormContextProvider>
          <TagsTable />
        </TagFormContextProvider>
      </>
    </div>
  );
};
