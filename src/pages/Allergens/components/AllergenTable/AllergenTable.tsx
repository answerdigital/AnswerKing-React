import { ReactElement } from 'react';
import CheckBoxIcon from 'common/Icons/CheckBoxIcon';
import { ProductDto } from 'dtos/Product/ProductDto';

interface Props {
  products: ProductDto[];
  allergens: string[];
}

export default function AllergenTable({ products, allergens }: Props): ReactElement {
  return (
    <table className="text-ak-grey-1 w-full table-auto border-separate border-spacing-0">
      <thead className="sticky top-0 w-full bg-white/90">
        <tr>
          <div className="border-ak-grey-2 border-b-2" />
          {allergens.map((value) => (
            <th className="border-ak-grey-2 rotate-180 border-t-2 p-2 text-left [writing-mode:vertical-lr]" key={value}>
              {value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="even:bg-ak-grey-5 text-right font-bold">
            <td className="py-3">{product.name}</td>
            {[...Array(allergens.length).keys()].map((value) => (
              <td key={value}>
                <div className="flex items-center justify-center">
                  <CheckBoxIcon checked={false} className="fill-[#333F4C]" />
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
