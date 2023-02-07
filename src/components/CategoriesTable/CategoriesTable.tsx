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
        {displayCategories.length ? (
          <table className="w-full table-auto divide-y">
            <thead>
              <tr>
                <th className={formatting}>ID</th>
                <th className={'w-full text-left' + formatting}>Category Name</th>
                <th className={'text-center ' + formatting}>No. Items</th>
                <th />
              </tr>
            </thead>
            <tbody className="font-poppins font-200 divide-y text-sm">
              {displayCategories.map((category) => (
                <CategoriesTableRow formatting={formatting} category={category} key={category.id} />
              ))}
            </tbody>
          </table>
        ) : (
          <>No Categories</>
        )}
      </div>
      <LoaderOverlay isEnabled={false} />
      <div className="flex w-full flex-none justify-between">
        <Search className="mx-4 my-2 h-14 w-1/2">Search Categories</Search>
        <Button className="mx-4 my-2 h-14 w-1/2" colour="yellow" size="small" onClick={openModal}>
          Add Category
        </Button>
      </div>
    </>
  );
};
