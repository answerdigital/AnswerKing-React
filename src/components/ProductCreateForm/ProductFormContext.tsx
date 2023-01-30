import { ProductDto } from 'dtos/ProductDto';
import { createContext, useContext, useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import { productProblemDetails, useProducts } from 'hooks/useProducts';
import { ProductForm } from './ProductForm';

const NAME_MIN_LENGTH = 1;
const NAME_MAX_LENGTH = 50;
const VALIDATION_MSG_NAME = 'Name is required, cannot contain special characters and must be less than 50 characters in length.';
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
const VALIDATION_MSG_DESC = 'Description is required and must be less than 500 characters in length.';

const descriptionIsValid = (description: string): boolean => {
  if (!description) {
    return false;
  }
  return description.length <= DESCRIPTION_MAX_LENGTH;
};

interface IFormProduct {
  name: string;
  desc: string;
  price: number;
  stock: number;
  tags: number[];
}

interface IProductFormContext {
  startEditing: (product: ProductDto) => void;
  startNew: () => void;
  useFormProduct: [IFormProduct, (newProduct: IFormProduct) => void];
  closeForm: () => void;
  saveForm: () => void;
}

const ProductFormContext = createContext<IProductFormContext>({
  startEditing: () => null,
  startNew: () => null,
  useFormProduct: [{ name: '', desc: '', price: 0, stock: 0, tags: [] }, () => null],
  closeForm: () => null,
  saveForm: () => null,
});

interface Props {
  children: React.ReactNode;
}

export const ProductFormContextProvider: React.FC<Props> = ({ children }) => {
  const [initialProduct, setInitialProduct] = useState<ProductDto | undefined>(undefined);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const { createProduct } = useProducts();
  const [formProduct, setFormProduct] = useState<IFormProduct>({ name: '', desc: '', price: 0, stock: 0, tags: [] });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const toastId = useRef(0);

  const editProduct = (newProduct: ProductDto): void => {
    setFormOpen(true);
    setInitialProduct(newProduct);
    setFormProduct({ name: newProduct.name, desc: newProduct.description, price: newProduct.price, stock: 1, tags: [] });
  };

  const newProduct = (): void => {
    setFormOpen(true);
    setInitialProduct(undefined);
    setFormProduct({ name: '', desc: '', price: 0, stock: 0, tags: [] });
  };

  const closeForm = (): void => {
    setInitialProduct(undefined);
    setFormOpen(false);
  };

  const handleErrorClear = (): void => {
    setValidationErrors([]);
    createProduct.reset();
    toast.dismiss(toastId.current);
  };

  const saveForm = (): void => {
    handleErrorClear();
    if (!nameIsValid(formProduct.name)) {
      setValidationErrors((errors) => [...errors, VALIDATION_MSG_NAME]);
    }
    if (!priceIsValid(formProduct.price.toString())) {
      setValidationErrors((errors) => [...errors, VALIDATION_MSG_PRICE]);
    }
    if (!descriptionIsValid(formProduct.desc)) {
      setValidationErrors((errors) => [...errors, VALIDATION_MSG_DESC]);
    }
    //TODO validation of tags.

    // Initially I checked for validationErrors.length however theres a slight delay with the state updating,
    // and sometimes this request gets fired when it shouldn't.
    if (nameIsValid(formProduct.name) && priceIsValid(formProduct.price.toString()) && descriptionIsValid(formProduct.desc)) {
      if (initialProduct) {
        /*
        TODO add update funtion to useProducts hook
        updateProduct.mutate(
          { initialProduct.id, name, price: parseFloat(price), description },
          {
            onSuccess: (product) => {
              toast.success(`Product "${product.name}" was succesfully updated.`);
            },
            onError: (problems: productProblemDetails) => {
              handleServerErrors(problems);
            },
          }
        );
        */
      } else {
        createProduct.mutate(
          { name: formProduct.name, price: formProduct.price, description: formProduct.desc },
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
    }
    closeForm();
  };

  const handleServerErrors = (problems: productProblemDetails): void => {
    const errorList = [];

    errorList.push(
      <div>
        {problems.title}
        <br />
        <br />
      </div>
    );

    if (problems.errors.name) {
      errorList.push(
        <li>
          {problems.errors.name[0]} <br />
        </li>
      );
    }
    if (problems.errors.price) {
      errorList.push(
        <li>
          {problems.errors.price[0]} <br />
        </li>
      );
    }
    if (problems.errors.description) {
      errorList.push(
        <li>
          {problems.errors.description[0]} <br />
        </li>
      );
    }

    toastId.current = toast.error(<ul>{errorList}</ul>) as number;
  };

  const contextValues: IProductFormContext = useMemo(
    () => ({
      startEditing: editProduct,
      startNew: newProduct,
      useFormProduct: [formProduct, setFormProduct],
      closeForm: closeForm,
      saveForm: saveForm,
    }),
    [initialProduct, formProduct]
  );

  return (
    <ProductFormContext.Provider value={contextValues}>
      {formOpen ? (
        <>
          <ProductForm />
        </>
      ) : (
        <>{children}</>
      )}
    </ProductFormContext.Provider>
  );
};

export const useProductFormContext = (): IProductFormContext => useContext(ProductFormContext);
