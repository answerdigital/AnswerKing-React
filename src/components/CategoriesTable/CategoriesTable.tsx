import { CategoriesTableRow } from './CategoriesTableRow';
import { useCategories } from 'hooks/useCategories';
import { ReactElement } from 'react';
import { useSearch } from 'components/Search/SearchContext';
import { Search } from 'components/Search/Search';
import { Button } from 'components/Buttons/Button';
import { useCategoryFormContext } from 'components/CategoryForm/CategoryFormContext';
import { CategoryDto } from 'dtos/CategoryDto';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';

export const CategoriesTable = (): ReactElement => {
  const { categories } = useCategories();
  const searchString = useSearch().searchString;
  const displayCategories: CategoryDto[] =
    categories.data?.filter((category) => !category.retired && category.name?.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) || [];
  const formatting = ' px-2 py-2 font-normal ';
  const openModal = useCategoryFormContext().startNew;

  return (
    <>
      <div className="h-full w-full overflow-auto">
        <table className="w-full table-auto divide-y">
          <thead className="sticky top-0 w-full bg-white/90">
            <tr>
              <th className={formatting}>ID</th>
              <th className={'w-full text-left' + formatting}>Category Name</th>
              <th className={'whitespace-nowrap text-center ' + formatting}>No. Items</th>
              <th />
            </tr>
          </thead>
          <tbody className="font-poppins font-200 divide-y text-sm">
            {displayCategories.map((category) => (
              <CategoriesTableRow formatting={formatting} category={category} key={category.id} />
            ))}
          </tbody>
        </table>
        <LoaderOverlay isEnabled={false} />
      </div>
      <div className="mt-4 grid h-10 w-full flex-none grid-cols-2 gap-4">
        <Search placeholder="Search Categories" sizeType="medium" />
        <Button colour="yellow" size="medium" onClick={openModal}>
          Add Category
        </Button>
      </div>
    </>
  );
};
