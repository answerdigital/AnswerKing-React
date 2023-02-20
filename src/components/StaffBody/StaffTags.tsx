import { ReactElement } from 'react';
import { TagFormContextProvider } from 'components/TagForm/TagFormContext';
import TagsTable from 'components/TagsTable/TagsTable';

export default function StaffTags(): ReactElement {
  return (
    <div className="flex h-[60vh] w-[45%] flex-col items-center justify-between rounded-2xl bg-white p-6 text-gray-900" key="staff tags">
      <TagFormContextProvider>
        <TagsTable />
      </TagFormContextProvider>
    </div>
  );
}
