import { ProductsTableRow } from './ProductsTableRow';
import { useProducts } from 'hooks/useProducts';
import { ReactElement } from 'react';
import { useSearch } from 'components/Search/SearchContext';
import { Search } from 'components/Search/Search';
import { Button } from 'components/Button/Button';
import { useProductFormContext } from 'components/ProductForm/ProductFormContext';
import { ProductDto } from 'dtos/ProductDto';

export const ProductsTable = (): ReactElement => {
  const { products } = useProducts();
  const padding = 'px-2 py-2';
  const searchString = useSearch().searchString;
  const displayProducts: ProductDto[] =
    products.data?.filter((product) => !product.retired && product.name?.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) || [];
  const openModal = useProductFormContext().startNew;

  return (
    <>
      {displayProducts.length ? (
        <table className="w-full table-auto divide-y">
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
            {displayProducts.map((product) => (
              <ProductsTableRow padding={padding} product={product} key={product.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <>No Products</>
      )}
      <div className="flex w-full flex-none justify-between">
        <Search className="h-14 w-1/2">Search Item</Search>
        <Button className="h-14 w-1/2" colour="yellow" size="small" onClick={openModal}>
          Add Item
        </Button>
      </div>
    </>
  );
};
