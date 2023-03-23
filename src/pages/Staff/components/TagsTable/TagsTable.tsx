import { ReactElement } from 'react';
import Button from 'common/Buttons/Button';
import LoaderOverlay from 'common/LoaderOverlay/LoaderOverlay';
import Search from 'common/Search/Search';
import { useSearch } from 'common/Search/SearchContext';
import { TagDto } from 'dtos/Tag/TagDto';
import useTags from 'hooks/useTags';
import TagsTableRow from './TagsTableRow';
import { useTagFormContext } from '../TagForm/TagFormContext';

export default function TagsTable(): ReactElement {
  const { tags } = useTags(true);
  const formatting = ' px-2 py-2 font-normal ';
  const { searchString } = useSearch();
  const displayTags: TagDto[] = tags.data?.filter((tag: TagDto) => tag.name?.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) || [];
  const tagForm = useTagFormContext();

  return (
    <>
      <div className="w-full overflow-auto">
        <table className="divide-ak-grey-5 w-full table-auto divide-y">
          <thead className="sticky top-0 w-full bg-white/90">
            <tr>
              <th className={formatting}>ID</th>
              <th className={`w-full text-left ${formatting}`}>Tag Name</th>
              <th className={`whitespace-nowrap text-center ${formatting}`}>No. Items</th>
              <th>{}</th>
            </tr>
          </thead>
          <tbody className="font-poppins font-200 divide-ak-grey-5 divide-y text-sm">
            {displayTags.map((tag) => (
              <TagsTableRow padding={formatting} tag={tag} key={tag.id} />
            ))}
          </tbody>
        </table>
        <LoaderOverlay isEnabled={false} />
      </div>
      <div className="mt-4 grid h-[45px] w-full flex-none grid-cols-2 gap-4">
        <Search placeholder="Search Tags" sizeType="medium" />
        <Button colour="yellow" onClick={tagForm.openForm}>
          Add Tag
        </Button>
      </div>
    </>
  );
}
