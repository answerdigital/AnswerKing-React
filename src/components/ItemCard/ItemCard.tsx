import './ItemCard.scss';
import PlaceHolderImage from 'assets/burger_transparent.png';
import { Button } from 'components/Button/Button';
import { ProductDto } from 'dtos/ProductDto';
import { useOrder } from 'hooks/useOrder';
import { ReactElement } from 'react';
import { toast } from 'react-toastify';

interface Props {
  item: ProductDto;
}

export const ItemCard = ({ item }: Props): ReactElement => {
  const { order, addItemToOrder, removeItemFromOrder, updateOrderItemQuantity } = useOrder();

  const quantity = order.data?.lineItems.find((lineItem) => lineItem.product.id === item.id)?.quantity;

  const handleAddItem = (orderId: number, itemId: number): void => {
    addItemToOrder.mutate(
      { orderId, itemId },
      {
        onSuccess: () => {
          toast.success(`Added ${item.name} to Order.`);
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
            toast.success(`Removed ${item.name} from Order.`);
          },
        }
      );
    }
    updateOrderItemQuantity.mutate(
      { orderId, itemId, updateDto: { quantity } },
      {
        onSuccess: () => {
          toast.success(`Updated quantity of ${item.name} to ${quantity}.`);
        },
      }
    );
  };

  return (
    <div className="item_card">
      <img alt="burger" className="item_card__image" src={PlaceHolderImage} />
      <div className="item_card__body">
        <div className="item_card__name">{item.name}</div>
        <div className="item_card__price">£{item.price}</div>
        <div className="item_card__buttons">
          {order.data && quantity ? (
            <div>
              <Button onClick={() => handleUpdateQuantity(order.data.id, item.id, quantity - 1)} size="small">
                -
              </Button>
              <span className="item_card__quantity">{quantity}</span>
              <Button onClick={() => handleUpdateQuantity(order.data.id, item.id, quantity + 1)} size="small">
                +
              </Button>
            </div>
          ) : null}
          {order.data && !quantity ? (
            <Button onClick={() => handleAddItem(order.data.id, item.id)} size="small">
              Add
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
