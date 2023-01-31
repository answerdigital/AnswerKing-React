import { CategoriesTableRow } from './CategoriesTableRow';
import { useCategories } from 'hooks/useCategories';
import { ReactElement } from 'react';
import { useSearch } from 'components/Search/SearchContext';
import { Search } from 'components/Search/Search';
import { Button } from 'components/Button/Button';
import { useCategoryFormContext } from 'components/CategoryForm/CategoryFormContext';

export const CategoriesTable = (): ReactElement => {
  const { categories } = useCategories();
  const padding = 'px-2 py-2';
  const searchString = useSearch().searchString;
  const openModal = useCategoryFormContext().startNew;

  return (
    <>
      <table className="categories_table w-full table-auto divide-y">
        <thead className="">
          <tr>
            <th className={'text-left ' + padding}>ID</th>
            <th className={'text-left ' + padding}>Category Name</th>
            <th className={'text-center ' + padding}>No. Items</th>
            <th />
          </tr>
        </thead>
        <tbody className="font-poppins font-200 divide-y text-sm">
          {categories.data?.map((category) =>
            !category.retired && category.name?.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) ? (
              <CategoriesTableRow padding={padding} category={category} key={category.id} />
            ) : null
          )}
        </tbody>
      </table>
      <div className="flex w-full flex-none justify-between">
        <Search className="h-14 w-1/2">Search Categories</Search>
        <Button className="h-14 w-1/2" colour="yellow" size="small" onClick={openModal}>
          Add Category
        </Button>
      </div>
    </>
  );
};
