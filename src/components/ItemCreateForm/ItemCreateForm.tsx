import './ItemCreateForm.scss';
import { Button } from 'components/Button/Button';
import { Error } from 'components/Error/Error';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { useItems } from 'hooks/useItems';
import React, { FormEvent, ReactElement, useState } from 'react';
import { toast } from 'react-toastify';

const NAME_MIN_LENGTH = 1;
const NAME_MAX_LENGTH = 50;
const VALIDATION_MSG_NAME =
  'Name is required, cannot contain special characters and must be less than 50 characters in length.';
const nameIsValid = (name: string): boolean => {
  const REGEX = /^[A-z0-9 ]*$/;
  return name.length >= NAME_MIN_LENGTH && name.length <= NAME_MAX_LENGTH && !!name.match(REGEX);
};

const PRICE_MIN = 0;
const PRICE_MAX = 999999999999.9999;
const VALIDATION_MSG_PRICE = 'Price is required and must be 0 or greater.';
const priceIsValid = (priceString: string): boolean => {
  const price = parseFloat(priceString);
  return !isNaN(price) && Number(price) >= PRICE_MIN && price <= PRICE_MAX;
};

const DESCRIPTION_MAX_LENGTH = 500;
const VALIDATION_MSG_DESC = 'Description must be less than 500 characters in length.';
const descriptionIsValid = (description: string): boolean => {
  if (!description) {
    return true;
  }
  return description.length <= DESCRIPTION_MAX_LENGTH;
};

export const ItemCreateForm = (): ReactElement => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0.00');
  const [description, setDescription] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { createItem } = useItems();

  const handleErrorClear = (): void => {
    setValidationErrors([]);
    createItem.reset();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleErrorClear();

    if (!nameIsValid(name)) {
      setValidationErrors((errors) => [...errors, VALIDATION_MSG_NAME]);
    }
    if (!priceIsValid(price)) {
      setValidationErrors((errors) => [...errors, VALIDATION_MSG_PRICE]);
    }
    if (!descriptionIsValid(description)) {
      setValidationErrors((errors) => [...errors, VALIDATION_MSG_DESC]);
    }

    // Initially I checked for validationErrors.length however theres a slight delay with the state updating,
    // and sometimes this request gets fired when it shouldn't.
    if (nameIsValid(name) && priceIsValid(price) && descriptionIsValid(description)) {
      createItem.mutate(
        { name, price: parseFloat(price), description },
        {
          onSuccess: (item) => {
            toast.success(`Item "${item.name}" was succesfully added.`);
          },
        }
      );
    }
  };

  return (
    <form className="item_create_form" onSubmit={handleSubmit}>
      <LoaderOverlay isEnabled={false} />
      <p className="item_create_form__description">Create an item</p>
      {createItem.error ? (
        <Error onClear={handleErrorClear}>
          <li>{createItem.error.title}</li>
        </Error>
      ) : null}
      {validationErrors.length > 0 ? (
        <Error onClear={handleErrorClear}>
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </Error>
      ) : null}
      <label className="item_create_form__label" htmlFor="item_create_form__name">
        Name:
      </label>
      <input
        className="item_create_form__input"
        id="item_create_form__name"
        onChange={(event) => setName(event.target.value)}
        type="text"
        value={name}
      />
      <label className="item_create_form__label" htmlFor="item_create_form_price">
        Price:
      </label>
      <input
        className="item_create_form__input"
        id="item_create_form__price"
        min={0}
        onChange={(event) => setPrice(event.target.value)}
        step={0.01}
        type="number"
        value={price}
      />
      <label className="item_create_form__label" htmlFor="item_create_form__description">
        Description (Optional):
      </label>
      <textarea
        className="item_create_form__input"
        id="item_create_form__description"
        onChange={(event) => setDescription(event.target.value)}
        rows={3}
        value={description}
      />

      <Button className="item_create_form__button" type="submit">
        Create
      </Button>
    </form>
  );
};
