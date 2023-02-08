import { ReactElement } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useCategoryFormContext } from './CategoryFormContext';
import { Button } from 'components/Buttons/Button';

export const CategoryForm = (): ReactElement => {
  const formContext = useCategoryFormContext();
  const [formCategory, setFormCategory] = formContext.useFormCategory;

  //Placeholder Data
  interface IProduct {
    id: number;
    name: string;
  }
  const allProducts: IProduct[] = [
    { id: 0, name: 'Burger' },
    { id: 1, name: 'Chips' },
    { id: 2, name: 'Salad' },
  ];

  const toggleProduct = (event: React.ChangeEvent<HTMLInputElement>, toggleProductId: number): void => {
    if (event.target.checked) {
      setFormCategory({
        ...formCategory,
        products: formCategory.products.concat([toggleProductId]),
      });
    } else {
      setFormCategory({
        ...formCategory,
        products: formCategory.products.filter((productId) => productId !== toggleProductId),
      });
    }
  };

  return (
    <>
      <form className="w-full overflow-auto">
        <div className="grid grid-cols-4 gap-4 p-2">
          <div className="col-span-2 row-span-3 flex h-full w-full items-center justify-center bg-gray-200">
            <FontAwesomeIcon icon={faPen} />
          </div>
          <div className="col-span-2">
            <label className="italic text-gray-400" htmlFor="category_create_form_name">
              Category Name
            </label>
            <input
              className="w-full border-b-2 focus:border-black focus:outline-none"
              id="category_create_form_name"
              onChange={(event) => setFormCategory({ ...formCategory, name: event.target.value })}
              type="text"
              value={formCategory.name}
            />
          </div>
          <div className="col-span-2 row-span-2">
            <label className="italic text-gray-400" htmlFor="category_create_form_desc">
              Category Description
            </label>
            <textarea
              className="w-full resize-none border-b-2 focus:border-black focus:outline-none"
              id="category_create_form_desc"
              onChange={(event) => setFormCategory({ ...formCategory, desc: event.target.value })}
              rows={3}
              value={formCategory.desc}
            />
          </div>
          <a className="col-span-4 italic text-gray-400">Products</a>
          {allProducts.map((product) => {
            return (
              <div key={product.id.toString()}>
                <input
                  type="checkbox"
                  className=""
                  id={product.name + ' in ' + formCategory.name}
                  onChange={(e) => toggleProduct(e, product.id)}
                  checked={formCategory.products.includes(product.id)}
                />
                <label className="text-sm" htmlFor={product.name + ' in ' + formCategory.name}>
                  {' ' + product.name}
                </label>
              </div>
            );
          })}
        </div>
      </form>
      <div className="grid h-16 w-full flex-none grid-cols-2 gap-8 px-4 py-2">
        <Button colour="yellow" size="medium" onClick={formContext.closeForm}>
          Cancel
        </Button>
        <Button colour="yellow" size="medium" onClick={formContext.saveForm}>
          Save Category
        </Button>
      </div>
    </>
  );
};
