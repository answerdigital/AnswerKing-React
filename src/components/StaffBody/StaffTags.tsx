import { TagFormContextProvider } from 'components/TagForm/TagFormContext';
import { TagsTable } from 'components/TagsTable/TagsTable';
import { ReactElement } from 'react';

export const StaffTags = (): ReactElement => {
  return (
    <div className="text-ak-grey-1 flex h-[60vh] w-[45%] flex-col items-center justify-between rounded-2xl bg-white p-6" key="staff tags">
      <TagFormContextProvider>
        <TagsTable />
      </TagFormContextProvider>
    </div>
  );
};
