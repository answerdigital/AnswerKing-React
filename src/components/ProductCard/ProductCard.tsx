import './ProductCard.scss';
import PlaceHolderImage from 'assets/burger_transparent.png';
import { Button } from 'components/Button/Button';
import { ProductDto } from 'dtos/ProductDto';
import { ReactElement } from 'react';
import { orderReducer, ActionType } from '../../context/orderReducer';

interface Props {
  product: ProductDto;
  dispatch: React.Dispatch<any>;
}

export const ProductCard = ({ product, dispatch }: Props): ReactElement => {
  const addClick = (product: ProductDto): void => {
    dispatch({ type: ActionType.Increase, payload: product });
  };
  const decreaseClick = (product: ProductDto): void => {
    dispatch({ type: ActionType.Decrease, payload: product });
  };
  return (
    <div className="product_card">
      <img alt="burger" className="product_card__image" src={PlaceHolderImage} />
      <div className="product_card__body">
        <div className="product_card__name">{product.name}</div>
        <div className="product_card__price">£{product.price}</div>
        <div className="product_card__buttons">
          <div>
            <Button onClick={() => decreaseClick(product)} size="small">
              -
            </Button>
            <span className="product_card__quantity"></span>
            <Button onClick={() => addClick(product)} size="small">
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
