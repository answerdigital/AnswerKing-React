import { ProductDto } from 'dtos/ProductDto';
import { createContext, useContext, useState, useRef, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useProducts } from 'hooks/useProducts';
import { ProductForm } from './ProductForm';

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
    if (nameIsValid(formProduct.name) && descriptionIsValid(formProduct.desc) && priceIsValid(formProduct.price.toString())) {
      setValidationErrors([]);
      closeForm();
    }
  };

  const NAME_MIN_LENGTH = 1;
  const NAME_MAX_LENGTH = 50;
  const VALIDATION_MSG_NAME = 'Name is required, cannot contain special characters and must be less than 50 characters in length.';
  const REGEX = new RegExp(`^[a-zA-Z0-9 ]{${NAME_MIN_LENGTH},${NAME_MAX_LENGTH}}$`);
  const nameIsValid = (name: string): boolean => {
    if (REGEX.test(name)) {
      return true;
    }
    setValidationErrors(validationErrors.concat(VALIDATION_MSG_NAME));
    return false;
  };

  const PRICE_MIN = 0;
  const PRICE_MAX = 999999999999.9999;
  const VALIDATION_MSG_PRICE = 'Price is required and must be 0 or greater.';
  const priceIsValid = (priceString: string): boolean => {
    const price = parseFloat(priceString);
    if (!isNaN(price) && Number(price) >= PRICE_MIN && price <= PRICE_MAX) {
      return true;
    }
    setValidationErrors(validationErrors.concat(VALIDATION_MSG_PRICE));
    return false;
  };

  const DESCRIPTION_MAX_LENGTH = 500;
  const VALIDATION_MSG_DESC = 'Description is required and must be less than 500 characters in length.';
  const descriptionIsValid = (description: string): boolean => {
    if (description && description.length <= DESCRIPTION_MAX_LENGTH) {
      return true;
    }
    setValidationErrors(validationErrors.concat(VALIDATION_MSG_DESC));
    return false;
  };

  useEffect(() => {
    if (validationErrors.length) {
      toastId.current = toast.error(
        <ul data-tesid="error-list">
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) as number;
    }
  }, [validationErrors]);

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
