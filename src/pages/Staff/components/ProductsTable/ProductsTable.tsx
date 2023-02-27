import { ReactElement } from 'react';
import Button from 'common/Buttons/Button';
import LoaderOverlay from 'common/LoaderOverlay/LoaderOverlay';
import Search from 'common/Search/Search';
import { useSearch } from 'common/Search/SearchContext';
import { ProductDto } from 'dtos/Product/ProductDto';
import useProducts from 'hooks/useProducts';
import ProductsTableRow from './ProductsTableRow';
import { useProductFormContext } from '../ProductForm/ProductFormContext';

export default function ProductsTable(): ReactElement {
  const { products } = useProducts();
  const productForm = useProductFormContext();
  const { searchString } = useSearch();
  const formatting = 'px-4 py-2 font-normal';
  const displayProducts: ProductDto[] =
    products.data?.filter((product) => product.name?.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) || [];

  return (
    <>
      <div className="h-full w-full overflow-auto">
        <table className="divide-ak-grey-5 w-full table-auto divide-y">
          <thead className="sticky top-0 w-full bg-white/90">
            <tr>
              <th className={`text-left ${formatting}`}>ID</th>
              <th className={`w-full text-left ${formatting}`}>Name</th>
              <th className={`text-center ${formatting}`}>Category</th>
              <th className={`text-center ${formatting}`}>Stock</th>
              <th className={`text-center ${formatting}`}>Price</th>
              <th className={`whitespace-nowrap text-center${formatting}`}>No. Sold</th>
              <th>{}</th>
            </tr>
          </thead>
          <tbody className="font-poppins font-200 divide-ak-grey-5 divide-y text-sm">
            {displayProducts.map((product) => (
              <ProductsTableRow formatting={formatting} product={product} key={product.id} />
            ))}
          </tbody>
        </table>
        <LoaderOverlay isEnabled={false} />
      </div>
      <div className="mt-4 grid h-[45px] w-full flex-none grid-cols-2 gap-4">
        <Search placeholder="Search Items" sizeType="medium" />
        <Button colour="yellow" onClick={productForm.openForm}>
          Add Item
        </Button>
      </div>
    </>
  );
}
