import { ProductsTableRow } from 'components/ProductsTableRow/ProductsTableRow';
import { useProducts } from 'hooks/useProducts';
import { ReactElement } from 'react';
import { useSearch } from 'components/Search/SearchContext';
import { Search } from 'components/Search/Search';
import { Button } from 'components/Button/Button';
import { useProductFormContext } from 'components/ProductCreateForm/ProductFormContext';

export const ProductsTable = (): ReactElement => {
  const { products } = useProducts();
  const padding = 'px-2 py-2';
  const searchString = useSearch().searchString;
  const openModal = useProductFormContext().startNew;

  return (
    <>
      <table className="products_table w-full table-auto divide-y">
        <thead className="">
          <tr>
            <th className={'text-left ' + padding}>ID</th>
            <th className={'text-left ' + padding}>Name</th>
            <th className={'text-center ' + padding}>Category</th>
            <th className={'text-center ' + padding}>Stock</th>
            <th className={'text-center ' + padding}>Price</th>
            <th className={'text-center ' + padding}>Sold</th>
            <th />
          </tr>
        </thead>
        <tbody className="font-poppins font-200 divide-y text-sm">
          {products.data?.map((product) =>
            !product.retired && product.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) ? (
              <ProductsTableRow padding={padding} product={product} key={product.id} />
            ) : null
          )}
        </tbody>
      </table>
      <div className="flex w-full flex-none justify-between">
        <Search className="h-14 w-1/2">Search Item</Search>
        <Button className="h-14 w-1/2" colour="yellow" size="small" onClick={openModal}>
          Add Item
        </Button>
      </div>
    </>
  );
};
