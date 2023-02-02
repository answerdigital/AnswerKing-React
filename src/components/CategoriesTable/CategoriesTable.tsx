import { CategoriesTableRow } from './CategoriesTableRow';
import { useCategories } from 'hooks/useCategories';
import { ReactElement } from 'react';
import { useSearch } from 'components/Search/SearchContext';
import { Search } from 'components/Search/Search';
import { Button } from 'components/Button/Button';
import { useCategoryFormContext } from 'components/CategoryForm/CategoryFormContext';
import { CategoryDto } from 'dtos/CategoryDto';

export const CategoriesTable = (): ReactElement => {
  const { categories } = useCategories();
  const searchString = useSearch().searchString;
  const displayCategories: CategoryDto[] =
    categories.data?.filter((category) => !category.retired && category.name?.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) || [];
  const padding = 'px-2 py-2';
  const openModal = useCategoryFormContext().startNew;

  return (
    <>
      {displayCategories.length ? (
        <table className="w-full table-auto divide-y">
          <thead className="">
            <tr>
              <th className={'text-left ' + padding}>ID</th>
              <th className={'text-left ' + padding}>Category Name</th>
              <th className={'text-center ' + padding}>No. Items</th>
              <th />
            </tr>
          </thead>
          <tbody className="font-poppins font-200 divide-y text-sm">
            {displayCategories.map((category) => (
              <CategoriesTableRow padding={padding} category={category} key={category.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <>No Categories</>
      )}
      <div className="flex w-full flex-none justify-between">
        <Search className="h-14 w-1/2">Search Categories</Search>
        <Button className="h-14 w-1/2" colour="yellow" size="small" onClick={openModal}>
          Add Category
        </Button>
      </div>
    </>
  );
};
