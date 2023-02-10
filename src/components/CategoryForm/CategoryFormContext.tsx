import { CategoryDto } from 'dtos/CategoryDto';
import { createContext, useContext, useState, useRef, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CategoryForm } from './CategoryForm';

const NAME_MIN_LENGTH = 1;
const NAME_MAX_LENGTH = 50;
const VALIDATION_MSG_NAME = 'Name is required, cannot contain special characters and must be less than 50 characters in length.';
const REGEX = new RegExp(`^[a-zA-Z0-9 ]{${NAME_MIN_LENGTH},${NAME_MAX_LENGTH}}$`);
const nameIsValid = (name: string): boolean => {
  return REGEX.test(name);
};

const DESCRIPTION_MAX_LENGTH = 500;
const VALIDATION_MSG_DESC = 'Description is required and must be less than 500 characters in length.';

const descriptionIsValid = (description: string): boolean => {
  if (!description) {
    return false;
  }
  return description.length <= DESCRIPTION_MAX_LENGTH;
};

interface IFormCategory {
  name: string;
  desc: string;
  products: number[];
}

interface ICategoryFormContext {
  startEditing: (category: CategoryDto) => void;
  startNew: () => void;
  useFormCategory: [IFormCategory, (newcategory: IFormCategory) => void];
  closeForm: () => void;
  saveForm: () => void;
}

const CategoryFormContext = createContext<ICategoryFormContext>({
  startEditing: () => null,
  startNew: () => null,
  useFormCategory: [{ name: '', desc: '', products: [] }, () => null],
  closeForm: () => null,
  saveForm: () => null,
});

interface Props {
  children: React.ReactNode;
}

export const CategoryFormContextProvider: React.FC<Props> = ({ children }) => {
  const [initialCategory, setInitialCategory] = useState<CategoryDto | undefined>(undefined);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [formCategory, setFormCategory] = useState<IFormCategory>({ name: '', desc: '', products: [] });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const toastId = useRef(0);

  const editCategory = (newCategory: CategoryDto): void => {
    setFormOpen(true);
    setInitialCategory(newCategory);
    setFormCategory({ name: newCategory.name ?? '', desc: newCategory.description ?? '', products: newCategory.products ?? [] });
  };

  const newCategory = (): void => {
    setFormOpen(true);
    setInitialCategory(undefined);
    setFormCategory({ name: '', desc: '', products: [] });
  };

  const closeForm = (): void => {
    setInitialCategory(undefined);
    setFormOpen(false);
  };

  const handleErrorClear = (): void => {
    setValidationErrors([]);
    toast.dismiss(toastId.current);
  };

  const saveForm = (): void => {
    handleErrorClear();
    if (!nameIsValid(formCategory.name)) {
      setValidationErrors((errors) => [...errors, VALIDATION_MSG_NAME]);
    }
    if (!descriptionIsValid(formCategory.desc)) {
      setValidationErrors((errors) => [...errors, VALIDATION_MSG_DESC]);
    }

    if (nameIsValid(formCategory.name) && descriptionIsValid(formCategory.desc)) {
      setValidationErrors([]);
      closeForm();
    }
  };

  useEffect(() => {
    if (validationErrors.length) {
      toastId.current = toast.error(
        <ul>
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) as number;
    }
  }, [validationErrors]);

  const contextValues: ICategoryFormContext = useMemo(
    () => ({
      startEditing: editCategory,
      startNew: newCategory,
      useFormCategory: [formCategory, setFormCategory],
      closeForm: closeForm,
      saveForm: saveForm,
    }),
    [initialCategory, formCategory]
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
