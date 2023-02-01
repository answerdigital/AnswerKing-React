import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { ReactElement } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useTagFormContext } from './TagFormContext';
import { Button } from 'components/Button/Button';

export const TagForm = (): ReactElement => {
  const formContext = useTagFormContext();
  const [formTag, setFormTag] = formContext.useFormTag;

  //Placeholder Data
  interface IProduct {
    id: number;
    name: string;
  }
  const Products: IProduct[] = [
    { id: 0, name: 'Burger' },
    { id: 1, name: 'Chips' },
    { id: 2, name: 'Salad' },
  ];
  //TODO: Get this data from backend instead

  const ToggleProduct = (event: React.ChangeEvent<HTMLInputElement>, toggleProductId: number): void => {
    if (event.target.checked) {
      setFormTag({
        ...formTag,
        products: formTag.products.concat([toggleProductId]),
      });
    } else {
      setFormTag({
        ...formTag,
        products: formTag.products.filter((productId) => productId !== toggleProductId),
      });
    }
  };

  return (
    <>
      <form>
        <div className="grid grid-cols-4 gap-4 p-2">
          <div className="col-span-2 row-span-3 flex h-full w-full items-center justify-center bg-gray-200">
            <FontAwesomeIcon icon={faPen} />
          </div>
          <div className="col-span-2">
            <label className="italic text-gray-400" htmlFor="tag_create_form_name">
              Tag Name
            </label>
            <input
              className="w-full border-b-2 focus:border-black focus:outline-none"
              id="tag_create_form_name"
              onChange={(event) => setFormTag({ ...formTag, name: event.target.value })}
              type="text"
              value={formTag.name}
            />
          </div>
          <div className="col-span-2 row-span-2">
            <label className="italic text-gray-400" htmlFor="tag_create_form_desc">
              Tag Description
            </label>
            <textarea
              className="w-full resize-none border-b-2 focus:border-black focus:outline-none"
              id="tag_create_form_desc"
              onChange={(event) => setFormTag({ ...formTag, desc: event.target.value })}
              rows={3}
              value={formTag.desc}
            />
          </div>
          <a className="col-span-4 italic text-gray-400">Products</a>
          {Products.map((product) => {
            return (
              <div key={product.name}>
                <input
                  type="checkbox"
                  className=""
                  id={product.name + ' in ' + formTag.name}
                  onChange={(e) => ToggleProduct(e, product.id)}
                  checked={formTag.products.includes(product.id)}
                />
                <label className="text-sm" htmlFor={product.name + ' in ' + formTag.name}>
                  {' ' + product.name}
                </label>
              </div>
            );
          })}
        </div>
        <LoaderOverlay isEnabled={false} />
      </form>
      <div className="flex w-full flex-none justify-between">
        <Button className="h-14 w-1/2" colour="yellow" size="small" onClick={formContext.closeForm}>
          Cancel
        </Button>
        <Button className="h-14 w-1/2" colour="yellow" size="small" onClick={formContext.saveForm}>
          Save Item
        </Button>
      </div>
    </>
  );
};
