import { CheckBoxIcon } from 'components/Icons/CheckBoxIcon';
import { ProductDto } from 'dtos/ProductDto';

interface Props {
  products: ProductDto[];
  allergens: string[];
}

export const AllergenTable = ({ products, allergens }: Props): React.ReactElement => {
  return (
    <table className="w-full table-auto border-separate border-spacing-0 text-[#333F4C]">
      <thead className="sticky top-0 w-full bg-white/90">
        <tr>
          <th className="border-b-2 border-[#5A6675]"></th>
          {allergens.map((value) => {
            return (
              <th className="rotate-180 border-t-2 border-[#5A6675] p-2 text-left [writing-mode:vertical-lr]" key={value}>
                {value}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          return (
            <tr key={product.id} className="text-right font-bold even:bg-[#E4EAEB]">
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
