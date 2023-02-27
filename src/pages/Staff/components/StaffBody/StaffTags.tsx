import { ReactElement } from 'react';
import { TagFormContextProvider } from '../TagForm/TagFormContext';
import TagsTable from '../TagsTable/TagsTable';

export default function StaffTags(): ReactElement {
  return (
    <div className="text-ak-grey-1 flex h-[60vh] w-[45%] flex-col items-center justify-between rounded-2xl bg-white p-6" key="staff tags">
      <TagFormContextProvider>
        <TagsTable />
      </TagFormContextProvider>
    </div>
  );
}
