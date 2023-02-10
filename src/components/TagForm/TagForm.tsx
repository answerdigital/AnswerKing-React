import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useTagFormContext } from './TagFormContext';
import { Button } from 'components/Buttons/Button';
import cn from 'classnames';

export const TagForm = (): ReactElement => {
  const formContext = useTagFormContext();
  const [formTag, setFormTag] = formContext.useFormTag;
  const subHeadingClass = 'italic text-[#A2AAB6] font-poly';

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
      <form className="w-full overflow-auto">
        <div className="grid grid-cols-4 gap-4 p-2">
          <div className="col-span-2 row-span-3 flex h-full w-full items-center justify-center bg-gray-200">
            <FontAwesomeIcon icon={faPen} />
          </div>
          <div className="col-span-2">
            <label className={cn(subHeadingClass)} htmlFor="tag_create_form_name">
              Tag Name
            </label>
            <input
              className="w-full border-b-2 font-[600] focus:border-black focus:outline-none"
              id="tag_create_form_name"
              onChange={(event) => setFormTag({ ...formTag, name: event.target.value })}
              type="text"
              value={formTag.name}
            />
          </div>
          <div className="col-span-2 row-span-2">
            <label className={cn(subHeadingClass)} htmlFor="tag_create_form_desc">
              Tag Description
            </label>
            <textarea
              className="w-full resize-none border-b-2 font-[600] focus:border-black focus:outline-none"
              id="tag_create_form_desc"
              onChange={(event) => setFormTag({ ...formTag, desc: event.target.value })}
              rows={3}
              value={formTag.desc}
            />
          </div>
          <a className={cn(subHeadingClass, 'col-span-4')}>Products</a>
          {allProducts.map((product, i) => {
            return (
              <div key={product.id.toString()}>
                <input
                  type="checkbox"
                  id={product.name + i + ' in ' + formTag.name}
                  onChange={(e) => toggleProduct(e, product.id)}
                  checked={formTag.products.includes(product.id)}
                />
                <label className="pl-2 text-sm" htmlFor={product.name + i + ' in ' + formTag.name}>
                  {product.name}
                </label>
              </div>
            );
          })}
        </div>
        <LoaderOverlay isEnabled={false} />
      </form>
      <div className="mt-4 grid h-10 w-full flex-none grid-cols-2 gap-4">
        <Button colour="white" size="medium" onClick={formContext.closeForm}>
          Cancel
        </Button>
        <Button colour="yellow" size="medium" onClick={formContext.saveForm}>
          Save Tag
        </Button>
      </div>
    </>
  );
};
