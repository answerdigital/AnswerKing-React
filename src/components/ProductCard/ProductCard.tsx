import './ProductCard.scss';
import PlaceHolderImage from 'assets/burger_transparent.png';
import { Button } from 'components/Button/Button';
import { ProductDto } from 'dtos/ProductDto';
import { useOrder } from 'hooks/useOrder';
import { ReactElement } from 'react';
import { toast } from 'react-toastify';

interface Props {
  product: ProductDto;
}

export const ProductCard = ({ product }: Props): ReactElement => {
  const { order, addItemToOrder, removeItemFromOrder, updateOrderItemQuantity } = useOrder();

  const quantity = order.data?.lineItems.find((lineItem) => lineItem.product.id === product.id)?.quantity;

  const handleAddItem = (orderId: number, itemId: number): void => {
    addItemToOrder.mutate(
      { orderId, itemId },
      {
        onSuccess: () => {
          toast.success(`Added ${product.name} to Order.`);
        },
      }
    );
  };

  const handleUpdateQuantity = (orderId: number, itemId: number, quantity: number): void => {
    if (quantity === 0) {
      return removeItemFromOrder.mutate(
        { orderId, itemId },
        {
          onSuccess: () => {
            toast.success(`Removed ${product.name} from Order.`);
          },
        }
      );
    }
    updateOrderItemQuantity.mutate(
      { orderId, itemId, updateDto: { quantity } },
      {
        onSuccess: () => {
          toast.success(`Updated quantity of ${product.name} to ${quantity}.`);
        },
      }
    );
  };

  return (
    <div className="product_card">
      <img alt="burger" className="product_card__image" src={PlaceHolderImage} />
      <div className="product_card__body">
        <div className="product_card__name">{product.name}</div>
        <div className="product_card__price">£{product.price}</div>
        <div className="product_card__buttons">
          {order.data && quantity ? (
            <div>
              <Button onClick={() => handleUpdateQuantity(order.data.id, product.id, quantity - 1)} size="small">
                -
              </Button>
              <span className="product_card__quantity">{quantity}</span>
              <Button onClick={() => handleUpdateQuantity(order.data.id, product.id, quantity + 1)} size="small">
                +
              </Button>
            </div>
          ) : null}
          {order.data && !quantity ? (
            <Button onClick={() => handleAddItem(order.data.id, product.id)} size="small">
              Add
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
