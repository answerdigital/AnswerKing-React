import { ProductsTableRow } from './ProductsTableRow';
import { useProducts } from 'hooks/useProducts';
import { ReactElement } from 'react';
import { useSearch } from 'components/Search/SearchContext';
import { Search } from 'components/Search/Search';
import { Button } from 'components/Buttons/Button';
import { ProductDto } from 'dtos/ProductDto';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { useProductFormContext } from 'components/ProductForm/ProductFormContext';

export const ProductsTable = (): ReactElement => {
  const { products } = useProducts();
  const productForm = useProductFormContext();
  const searchString = useSearch().searchString;

  const formatting = ' px-4 py-2 font-normal ';
  const displayProducts: ProductDto[] =
    products.data?.filter((product) => !product.retired && product.name?.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) || [];

  return (
    <>
      <div className="h-full w-full overflow-auto">
        <table className="w-full table-auto divide-y">
          <thead className="sticky top-0 w-full bg-white/90">
            <tr>
              <th className={'text-left ' + formatting}>ID</th>
              <th className={'w-full text-left ' + formatting}>Name</th>
              <th className={'text-center ' + formatting}>Category</th>
              <th className={'text-center ' + formatting}>Stock</th>
              <th className={'text-center ' + formatting}>Price</th>
              <th className={'whitespace-nowrap text-center' + formatting}>No. Sold</th>
              <th />
            </tr>
          </thead>
          <tbody className="font-poppins font-200 divide-y text-sm">
            {displayProducts.map((product) => (
              <ProductsTableRow formatting={formatting} product={product} key={product.id} />
            ))}
          </tbody>
        </table>
        <LoaderOverlay isEnabled={false} />
      </div>
      <div className="mt-4 grid h-10 w-full flex-none grid-cols-2 gap-4">
        <Search placeholder="Search Items" sizeType="medium" />
        <Button colour="yellow" size="medium" onClick={productForm.openForm}>
          Add Item
        </Button>
      </div>
    </>
  );
};
