import { TagsTableRow } from './TagsTableRow';
import { useTags } from 'hooks/useTags';
import { ReactElement } from 'react';
import { useSearch } from 'components/Search/SearchContext';
import { Search } from 'components/Search/Search';
import { Button } from 'components/Buttons/Button';
import { useTagFormContext } from 'components/TagForm/TagFormContext';
import { TagDto } from 'dtos/TagDto';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';

export const TagsTable = (): ReactElement => {
  const { tags } = useTags();
  const formatting = ' px-2 py-2 font-normal ';
  const searchString = useSearch().searchString;
  const displayTags: TagDto[] =
    tags.data?.filter((tag) => !tag.retired && tag.name?.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) || [];
  const openModal = useTagFormContext().startNew;

  return (
    <>
      <div className="w-full overflow-auto">
        <table className="w-full table-auto divide-y">
          <thead className="sticky top-0 w-full bg-white/90">
            <tr>
              <th className={formatting}>ID</th>
              <th className={'w-full text-left ' + formatting}>Tag Name</th>
              <th className={'whitespace-nowrap text-center ' + formatting}>No. Items</th>
              <th />
            </tr>
          </thead>
          <tbody className="font-poppins font-200 divide-y text-sm">
            {displayTags.map((tag) => (
              <TagsTableRow padding={formatting} tag={tag} key={tag.id} />
            ))}
          </tbody>
        </table>
        <LoaderOverlay isEnabled={false} />
      </div>
      <div className="mt-4 grid h-[45px] w-full flex-none grid-cols-2 gap-4">
        <Search placeholder="Search Tags" sizeType="medium" />
        <Button colour="yellow" onClick={openModal}>
          Add Tag
        </Button>
      </div>
    </>
  );
};
