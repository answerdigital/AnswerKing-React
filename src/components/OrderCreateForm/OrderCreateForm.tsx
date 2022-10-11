import './OrderCreateForm.scss';
import { Button } from 'components/Button/Button';
import { Error } from 'components/Error/Error';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { useOrder } from 'hooks/useOrder';
import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';

export const OrderCreateForm = (): ReactElement => {
  const [address, setAddress] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const { createOrder } = useOrder();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (address) {
      setValidationMessage('');
      createOrder.mutate({ address });
    } else {
      setValidationMessage('Address is required to create an order.');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setAddress(event.target.value);
  };

  const handleErrorClear = (): void => {
    setValidationMessage('');
    createOrder.reset();
  };

  return (
    <form className="order_create_form" onSubmit={handleSubmit}>
      <LoaderOverlay isEnabled={createOrder.isLoading} />
      <p className="order_create_form__description">Create a new order</p>
      {createOrder.error ? (
        <Error onClear={handleErrorClear}>
          <li>{createOrder.error.title}</li>
        </Error>
      ) : null}
      {validationMessage ? (
        <Error onClear={handleErrorClear}>
          <li>{validationMessage}</li>
        </Error>
      ) : null}
      <label className="order_create_form__label" htmlFor="order_create_form__input">
        Address:
      </label>
      <textarea className="order_create_form__input" onChange={handleChange} rows={5} value={address} />
      <Button className="order_create_form__button" type="submit">
        Create Order
      </Button>
    </form>
  );
};
