import { ProductsTableRow } from './ProductsTableRow';
import { useProducts } from 'hooks/useProducts';
import { ReactElement } from 'react';
import { useSearch } from 'components/Search/SearchContext';
import { Search } from 'components/Search/Search';
import { Button } from 'components/Buttons/Button';
import { useProductFormContext } from 'components/ProductForm/ProductFormContext';
import { ProductDto } from 'dtos/ProductDto';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';

export const ProductsTable = (): ReactElement => {
  const { products } = useProducts();
  const formatting = ' px-4 py-2 font-normal ';
  const searchString = useSearch().searchString;
  const displayProducts: ProductDto[] =
    products.data?.filter((product) => !product.retired && product.name?.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) || [];
  const openModal = useProductFormContext().startNew;

  return (
    <>
      <div className="h-full w-full overflow-auto">
        {displayProducts.length ? (
          <table className="w-full table-auto divide-y">
            <thead>
              <tr>
                <th className={'text-left ' + formatting}>ID</th>
                <th className={'text-left ' + formatting}>Name</th>
                <th className={'text-center ' + formatting}>Category</th>
                <th className={'text-center ' + formatting}>Stock</th>
                <th className={'text-center ' + formatting}>Price</th>
                <th className={'text-center ' + formatting}>No. Sold</th>
                <th />
              </tr>
            </thead>
            <tbody className="font-poppins font-200 divide-y text-sm">
              {displayProducts.map((product) => (
                <ProductsTableRow formatting={formatting} product={product} key={product.id} />
              ))}
            </tbody>
          </table>
        ) : (
          <>No Products</>
        )}
        <LoaderOverlay isEnabled={false} />
      </div>
      <div className="flex w-full flex-none justify-between">
        <Search className="h-14 w-1/2">Search Item</Search>
        <Button className="h-14 w-1/2" colour="yellow" size="small" onClick={openModal}>
          Add Item
        </Button>
      </div>
    </>
  );
};
