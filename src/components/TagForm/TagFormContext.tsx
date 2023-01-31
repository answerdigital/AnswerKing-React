import { TagDto } from 'dtos/TagDto';
import { createContext, useContext, useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import { /*tagProblemDetails,*/ useTags } from 'hooks/useTags';
import { TagForm } from './TagForm';

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

interface IFormTag {
  name: string;
  desc: string;
  products: number[];
}

interface ITagFormContext {
  startEditing: (tag: TagDto) => void;
  startNew: () => void;
  useFormTag: [IFormTag, (newtag: IFormTag) => void];
  closeForm: () => void;
  saveForm: () => void;
}

const TagFormContext = createContext<ITagFormContext>({
  startEditing: () => null,
  startNew: () => null,
  useFormTag: [{ name: '', desc: '', products: [] }, () => null],
  closeForm: () => null,
  saveForm: () => null,
});

interface Props {
  children: React.ReactNode;
}

export const TagFormContextProvider: React.FC<Props> = ({ children }) => {
  const [initialTag, setInitialTag] = useState<TagDto | undefined>(undefined);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  //const { createTag } = useTags();
  const [formTag, setFormTag] = useState<IFormTag>({ name: '', desc: '', products: [] });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const toastId = useRef(0);

  const editTag = (newTag: TagDto): void => {
    setFormOpen(true);
    setInitialTag(newTag);
    setFormTag({ name: newTag.name ?? '', desc: newTag.description ?? '', products: newTag.products ?? [] });
  };

  const newTag = (): void => {
    setFormOpen(true);
    setInitialTag(undefined);
    setFormTag({ name: '', desc: '', products: [] });
  };

  const closeForm = (): void => {
    setInitialTag(undefined);
    setFormOpen(false);
  };

  const handleErrorClear = (): void => {
    setValidationErrors([]);
    //createtag.reset();
    toast.dismiss(toastId.current);
  };

  const saveForm = (): void => {
    handleErrorClear();
    if (!nameIsValid(formTag.name)) {
      setValidationErrors((errors) => [...errors, VALIDATION_MSG_NAME]);
    }
    if (!descriptionIsValid(formTag.desc)) {
      setValidationErrors((errors) => [...errors, VALIDATION_MSG_DESC]);
    }
    //TODO validation of products.

    if (nameIsValid(formTag.name) && descriptionIsValid(formTag.desc)) {
      if (initialTag) {
        console.log('Editing tags not yet implemented');
        /*
        TODO add update funtion to usetags hook
        updatetag.mutate(
          { initialtag.id, name, price: parseFloat(price), description },
          {
            onSuccess: (tag) => {
              toast.success(`tag "${tag.name}" was succesfully updated.`);
            },
            onError: (problems: tagProblemDetails) => {
              handleServerErrors(problems);
            },
          }
        );
        */
      } else {
        console.log('Saving new tags not yet implemented');
        /*
        createtag.mutate(
          { name: formtag.name, price: formtag.price, description: formtag.desc },
          {
            onSuccess: (tag) => {
              toast.success(`tag "${tag.name}" was succesfully added.`);
            },
            onError: (problems: tagProblemDetails) => {
              handleServerErrors(problems);
            },
          }
        );
        */
      }
    }
    closeForm();
  };

  /*
  const handleServerErrors = (problems: tagProblemDetails): void => {
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
    if (problems.errors.description) {
      errorList.push(
        <li>
          {problems.errors.description[0]} <br />
        </li>
      );
    }

    toastId.current = toast.error(<ul>{errorList}</ul>) as number;
  };
  */

  const contextValues: ITagFormContext = useMemo(
    () => ({
      startEditing: editTag,
      startNew: newTag,
      useFormTag: [formTag, setFormTag],
      closeForm: closeForm,
      saveForm: saveForm,
    }),
    [initialTag, formTag]
  );

  return (
    <TagFormContext.Provider value={contextValues}>
      {formOpen ? (
        <>
          <TagForm />
        </>
      ) : (
        <>{children}</>
      )}
    </TagFormContext.Provider>
  );
};

export const useTagFormContext = (): ITagFormContext => useContext(TagFormContext);
