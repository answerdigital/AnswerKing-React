import { ProductDto } from 'dtos/ProductDto';
import { createContext, useContext, useState, useMemo } from 'react';
import { ProductForm } from './ProductForm';

interface IProductFormContext {
  startEditing: (product: ProductDto) => void;
  openForm: () => void;
  closeForm: () => void;
  initialProduct?: ProductDto;
}

const ProductFormContext = createContext<IProductFormContext>({
  startEditing: () => null,
  openForm: () => null,
  closeForm: () => null,
});

interface Props {
  children: React.ReactNode;
}

export const ProductFormContextProvider: React.FC<Props> = ({ children }) => {
  const [initialProduct, setInitialProduct] = useState<ProductDto | undefined>(undefined);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const editProduct = (newProduct: ProductDto): void => {
    setFormOpen(true);
    setInitialProduct(newProduct);
  };

  const openForm = (): void => {
    setInitialProduct(undefined);
    setFormOpen(true);
  };

  const closeForm = (): void => {
    setInitialProduct(undefined);
    setFormOpen(false);
  };

  const contextValues: IProductFormContext = useMemo(
    () => ({
      startEditing: editProduct,
      openForm: openForm,
      closeForm: closeForm,
      initialProduct: initialProduct,
    }),
    [initialProduct]
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
