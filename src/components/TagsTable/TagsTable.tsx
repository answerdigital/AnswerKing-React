import { TagsTableRow } from './TagsTableRow';
import { useTags } from 'hooks/useTags';
import { ReactElement } from 'react';
import { useSearch } from 'components/Search/SearchContext';
import { Search } from 'components/Search/Search';
import { Button } from 'components/Button/Button';
import { useTagFormContext } from 'components/TagForm/TagFormContext';
import { TagDto } from 'dtos/TagDto';

export const TagsTable = (): ReactElement => {
  const { tags } = useTags();
  const padding = 'px-2 py-2';
  const searchString = useSearch().searchString;
  const displayTags: TagDto[] =
    tags.data?.filter((tag) => !tag.retired && tag.name?.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) || [];
  const openModal = useTagFormContext().startNew;

  return (
    <>
      {displayTags.length ? (
        <table className="w-full table-auto divide-y">
          <thead className="">
            <tr>
              <th className={'text-left ' + padding}>ID</th>
              <th className={'text-left ' + padding}>Tag Name</th>
              <th className={'text-center ' + padding}>No. Items</th>
              <th />
            </tr>
          </thead>
          <tbody className="font-poppins font-200 divide-y text-sm">
            {displayTags.map((tag) => (
              <TagsTableRow padding={padding} tag={tag} key={tag.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <>No Tags</>
      )}
      <div className="flex w-full flex-none justify-between">
        <Search className="h-14 w-1/2">Search Tags</Search>
        <Button className="h-14 w-1/2" colour="yellow" size="small" onClick={openModal}>
          Add Tag
        </Button>
      </div>
    </>
  );
};
