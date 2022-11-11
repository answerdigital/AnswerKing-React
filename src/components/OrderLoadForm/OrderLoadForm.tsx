import './OrderLoadForm.scss';
import { Button } from 'components/Button/Button';
import { Error } from 'components/Error/Error';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { useOrder } from 'hooks/useOrder';
import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';

const idIsValid = (id: string): boolean => {
  return id.length > 0 && parseInt(id, 10) > 0;
};

export const OrderLoadForm = (): ReactElement => {
  const [orderId, setOrderId] = useState('1');
  const [validationMessage, setValidationMessage] = useState('');
  const { getOrder } = useOrder();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    getOrder.reset();

    if (idIsValid(orderId)) {
      setValidationMessage('');
      getOrder.mutate(parseInt(orderId, 10));
    } else {
      setValidationMessage('Order ID is required to load an order.');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setOrderId(event.target.value);
  };

  const handleErrorClear = (): void => {
    setValidationMessage('');
    getOrder.reset();
  };

  return (
    <form className="order_load_form" onSubmit={handleSubmit}>
      <LoaderOverlay isEnabled={getOrder.isLoading} />
      <p className="order_load_form__description">Load an existing order</p>
      {getOrder.error ? (
        <Error onClear={handleErrorClear}>
          <li>{getOrder.error.title}</li>
        </Error>
      ) : null}
      {validationMessage ? (
        <Error onClear={handleErrorClear}>
          <li>{validationMessage}</li>
        </Error>
      ) : null}
      <label className="order_load_form__label" htmlFor="order_load_form__input">
        Order ID:
      </label>
      <input
        className="order_load_form__input"
        data-testid="order-load-id-input"
        name="orderId"
        onChange={handleChange}
        step="1"
        type="number"
        value={orderId}
      />
      <Button className="order_load_form__button" data-testid="order-load-submit-button" type="submit">
        Get Order
      </Button>
    </form>
  );
};
