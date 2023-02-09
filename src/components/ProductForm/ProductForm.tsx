import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { useProductFormContext } from './ProductFormContext';
import { Button } from 'components/Buttons/Button';

export const ProductForm = (): ReactElement => {
  const formContext = useProductFormContext();
  const [formProduct, setFormProduct] = formContext.useFormProduct;

  //Placeholder Data
  interface ITag {
    id: number;
    name: string;
  }
  const allTags: ITag[] = [
    { id: 0, name: 'Vegan' },
    { id: 1, name: 'Vegetarian' },
    { id: 2, name: 'Good Food' },
    { id: 3, name: 'Nut-Free' },
    { id: 4, name: 'Gluten-Free' },
    { id: 5, name: 'Breakfast Menu' },
    { id: 6, name: 'Vegan' },
    { id: 7, name: 'Vegetarian' },
    { id: 8, name: 'Good Food' },
    { id: 9, name: 'Nut-Free' },
    { id: 10, name: 'Gluten-Free' },
    { id: 11, name: 'Breakfast Menu' },
    { id: 12, name: 'Vegan' },
    { id: 13, name: 'Vegetarian' },
    { id: 14, name: 'Good Food' },
    { id: 15, name: 'Nut-Free' },
    { id: 16, name: 'Gluten-Free' },
    { id: 17, name: 'Breakfast Menu' },
    { id: 18, name: 'Vegan' },
    { id: 19, name: 'Vegetarian' },
    { id: 20, name: 'Good Food' },
  ];
  const categories = ['Mains', 'Sides', 'Drinks'];

  const toggleTag = (event: React.ChangeEvent<HTMLInputElement>, toggleTagId: number): void => {
    if (event.target.checked) {
      setFormProduct({
        ...formProduct,
        tags: formProduct.tags.concat([toggleTagId]),
      });
    } else {
      setFormProduct({
        ...formProduct,
        tags: formProduct.tags.filter((tagId) => tagId !== toggleTagId),
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
            <label className="italic text-gray-400" htmlFor="product_create_form_name">
              Item Name
            </label>
            <input
              className="w-full border-b-2 focus:border-black focus:outline-none"
              id="product_create_form_name"
              onChange={(event) => setFormProduct({ ...formProduct, name: event.target.value })}
              type="text"
              value={formProduct.name}
              data-testid="product-name"
            />
          </div>
          <div className="col-span-2 row-span-2">
            <label className="italic text-gray-400" htmlFor="product_create_form_desc">
              Item Description
            </label>
            <textarea
              className="w-full resize-none border-b-2 focus:border-black focus:outline-none"
              id="product_create_form_desc"
              onChange={(event) => setFormProduct({ ...formProduct, desc: event.target.value })}
              rows={3}
              value={formProduct.desc}
              data-testid="product-description"
            />
          </div>
          <div className="col-span-2">
            <label className="w-full text-left italic text-gray-400" htmlFor="product_create_form_category">
              Category
            </label>
            <Dropdown options={categories} className="w-full" id="product_create_form_category" />
          </div>
          <div className="flex w-full flex-col">
            <label className="italic text-gray-400" htmlFor="product_create_form__price">
              Price
            </label>
            <input
              className="border-b-2 focus:border-black focus:outline-none"
              id="product_create_form__price"
              onChange={(event) => setFormProduct({ ...formProduct, price: parseFloat(event.target.value) })}
              step={0.01}
              type="number"
              value={formProduct.price}
              min={0}
              data-testid="product-price"
            />
          </div>
          <div className="flex w-full flex-col">
            <label className="italic text-gray-400" htmlFor="product_create_form__stock">
              Stock Count
            </label>
            <input
              className="border-b-2 focus:border-black focus:outline-none"
              id="product_create_form__stock"
              onChange={(event) => setFormProduct({ ...formProduct, stock: parseFloat(event.target.value) })}
              step={1}
              type="number"
              value={formProduct.stock}
              min={0}
            />
          </div>
          <a className="col-span-4 italic text-gray-400">Tags</a>
          {allTags.map((tag) => {
            return (
              <div key={tag.id.toString()}>
                <input
                  type="checkbox"
                  id={tag.name + ' in ' + formProduct.name}
                  onChange={(e) => toggleTag(e, tag.id)}
                  checked={formProduct.tags.includes(tag.id)}
                />
                <label className="pl-2 text-sm" htmlFor={tag.name + ' in ' + formProduct.name}>
                  {tag.name}
                </label>
              </div>
            );
          })}
        </div>
        <LoaderOverlay isEnabled={false} />
      </form>
      <div className="mt-4 grid h-10 w-full flex-none grid-cols-2 gap-4">
        <Button colour="yellow" size="medium" onClick={formContext.closeForm}>
          Cancel
        </Button>
        <Button colour="yellow" size="medium" onClick={formContext.saveForm} data-testid="submit-product">
          Save Item
        </Button>
      </div>
    </>
  );
};
