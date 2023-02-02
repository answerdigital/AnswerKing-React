import { CheckBoxIcon } from 'components/Icons/CheckBoxIcon';
import { ProductDto } from 'dtos/ProductDto';

interface Props {
  products: ProductDto[];
  allergens: string[];
}

export const AllergenTable = ({ products, allergens }: Props): React.ReactElement => {
  return (
    <table className="relative mt-5 mb-5 w-full table-auto border-separate border-spacing-2">
      <thead className="w-full">
        <tr>
          <th></th>
          {allergens.map((value) => {
            return (
              <th className="rotate-180 p-2 text-left font-light [writing-mode:vertical-lr]" key={value}>
                {value}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="z-10 w-full">
        {products.map((product) => {
          return (
            <tr key={product.id}>
              <td className="text-right font-light">{product.name}</td>
              {[...Array(allergens.length).keys()].map((value) => {
                return (
                  <td key={value}>
                    <div className="flex items-center justify-center">
                      <CheckBoxIcon checked={false} />
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
