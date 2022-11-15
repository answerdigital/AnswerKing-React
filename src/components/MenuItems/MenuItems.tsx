import './MenuItems.scss';
import { ProductCard } from 'components/ProductCard/ProductCard';
import { CategoryDto } from 'dtos/CategoryDto';
import { ProductDto } from 'dtos/ProductDto';
import { ReactElement } from 'react';

interface Props {
  category: CategoryDto;
  products: ProductDto[];
}

export const MenuItems = ({ category, products }: Props): ReactElement => {
  if (products.length === 0) {
    return <div />;
  }
  return (
    <div className="mw-960" id={category.name}>
      <div className="menu_items__category">{category.name}s</div>
      <div className="menu_items">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
        <div className="menu_items__filler" />
        <div className="menu_items__filler" />
        <div className="menu_items__filler" />
        <div className="menu_items__filler" />
        <div className="menu_items__filler" />
        <div className="menu_items__filler" />
      </div>
    </div>
  );
};
