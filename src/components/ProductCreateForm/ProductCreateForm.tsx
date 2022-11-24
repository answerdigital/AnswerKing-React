import './ProductCreateForm.scss';
import { Button } from 'components/Button/Button';
import { Error } from 'components/Error/Error';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { useProducts } from 'hooks/useProducts';
import { FormEvent, ReactElement, useState } from 'react';
import { toast } from 'react-toastify';
import { productProblemDetails } from 'hooks/useProducts';

const NAME_MIN_LENGTH = 1;
const NAME_MAX_LENGTH = 50;
const VALIDATION_MSG_NAME =
  'Name is required, cannot contain special characters and must be less than 50 characters in length.';
const REGEX = new RegExp(`^[a-zA-Z0-9 ]{${NAME_MIN_LENGTH},${NAME_MAX_LENGTH}}$`);
const nameIsValid = (name: string): boolean => {
  return REGEX.test(name);
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

export const ProductCreateForm = (): ReactElement => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0.00');
  const [description, setDescription] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { createProduct } = useProducts();

  const handleErrorClear = (): void => {
    setValidationErrors([]);
    createProduct.reset();
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
      createProduct.mutate(
        { name, price: parseFloat(price), description },
        {
          onSuccess: (product) => {
            toast.success(`Product "${product.name}" was succesfully added.`);
          },
          onError: (problems: productProblemDetails) => {
            handleServerErrors(problems);
          },
        }
      );
    }
  };

  const handleServerErrors = (problems: productProblemDetails): void => {
    if (problems.errors.name) {
      toast.error(problems.errors.name[0]);
    }
    if (problems.errors.price) {
      toast.error(problems.errors.price[0]);
    }
    if (problems.errors.description) {
      toast.error(problems.errors.description[0]);
    }
  };

  return (
    <form className="product_create_form" onSubmit={handleSubmit}>
      <LoaderOverlay isEnabled={false} />
      <p className="product_create_form__description">Create an product</p>
      {validationErrors.length > 0 ? (
        <Error onClear={handleErrorClear}>
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </Error>
      ) : null}
      <label className="product_create_form__label" htmlFor="product_create_form__name">
        Name:
      </label>
      <input
        className="product_create_form__input"
        id="product_create_form__name"
        onChange={(event) => setName(event.target.value)}
        type="text"
        value={name}
      />
      <label className="product_create_form__label" htmlFor="product_create_form_price">
        Price:
      </label>
      <input
        className="product_create_form__input"
        id="product_create_form__price"
        onChange={(event) => setPrice(event.target.value)}
        step={0.01}
        type="number"
        value={price}
      />
      <label className="product_create_form__label" htmlFor="product_create_form__description">
        Description:
      </label>
      <textarea
        className="product_create_form__input"
        id="product_create_form__description"
        onChange={(event) => setDescription(event.target.value)}
        rows={3}
        value={description}
      />
      <Button className="product_create_form__button" type="submit">
        Create
      </Button>
    </form>
  );
};
