import { CheckBoxIcon } from 'components/Icons/CheckBoxIcon';
import { ProductDto } from 'dtos/ProductDto';
import { ReactElement } from 'react';

interface Props {
  products: ProductDto[];
  allergens: string[];
}

export const AllergenTable = ({ products, allergens }: Props): ReactElement => {
  return (
    <table className="text-ak-grey-1 w-full table-auto border-separate border-spacing-0">
      <thead className="sticky top-0 w-full bg-white/90">
        <tr>
          <th className="border-ak-grey-2 border-b-2"></th>
          {allergens.map((value) => {
            return (
              <th className="border-ak-grey-2 rotate-180 border-t-2 p-2 text-left [writing-mode:vertical-lr]" key={value}>
                {value}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          return (
            <tr key={product.id} className="even:bg-ak-grey-5 text-right font-bold">
              <td className="py-3">{product.name}</td>
              {[...Array(allergens.length).keys()].map((value) => {
                return (
                  <td key={value}>
                    <div className="flex items-center justify-center">
                      <CheckBoxIcon checked={false} className="fill-[#333F4C]" />
                    </div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
