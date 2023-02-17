import { CategoryDto } from 'dtos/CategoryDto';
import { createContext, useContext, useState, useMemo } from 'react';
import { CategoryForm } from './CategoryForm';

interface ICategoryFormContext {
  startEditing: (category: CategoryDto) => void;
  openForm: () => void;
  closeForm: () => void;
  initialCategory?: CategoryDto;
}

const CategoryFormContext = createContext<ICategoryFormContext>({
  startEditing: () => null,
  openForm: () => null,
  closeForm: () => null,
});

interface Props {
  children: React.ReactNode;
}

export const CategoryFormContextProvider: React.FC<Props> = ({ children }) => {
  const [initialCategory, setInitialCategory] = useState<CategoryDto | undefined>(undefined);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const editCategory = (newCategory: CategoryDto): void => {
    setFormOpen(true);
    setInitialCategory(newCategory);
  };

  const openForm = (): void => {
    setFormOpen(true);
    setInitialCategory(undefined);
  };

  const closeForm = (): void => {
    setInitialCategory(undefined);
    setFormOpen(false);
  };

  const contextValues: ICategoryFormContext = useMemo(
    () => ({
      startEditing: editCategory,
      openForm: openForm,
      closeForm: closeForm,
      initialCategory: initialCategory,
    }),
    [initialCategory]
  );

  return (
    <CategoryFormContext.Provider value={contextValues}>
      {formOpen ? (
        <>
          <CategoryForm />
        </>
      ) : (
        <>{children}</>
      )}
    </CategoryFormContext.Provider>
  );
};

export const useCategoryFormContext = (): ICategoryFormContext => useContext(CategoryFormContext);
