import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { TagDto } from 'dtos/Tag/TagDto';
import TagForm from './TagForm';

interface ITagFormContext {
  startEditing: (tag: TagDto) => void;
  openForm: () => void;
  closeForm: () => void;
  initialTag?: TagDto;
}

const TagFormContext = createContext<ITagFormContext>({
  startEditing: () => null,
  openForm: () => null,
  closeForm: () => null,
});

interface Props {
  children: ReactNode;
}

export const TagFormContextProvider: React.FC<Props> = ({ children }) => {
  const [initialTag, setInitialTag] = useState<TagDto | undefined>(undefined);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const editTag = (newTag: TagDto): void => {
    setFormOpen(true);
    setInitialTag(newTag);
  };

  const openForm = (): void => {
    setFormOpen(true);
    setInitialTag(undefined);
  };

  const closeForm = (): void => {
    setInitialTag(undefined);
    setFormOpen(false);
  };

  const contextValues: ITagFormContext = useMemo(
    () => ({
      startEditing: editTag,
      openForm,
      closeForm,
      initialTag,
    }),
    [initialTag]
  );

  return <TagFormContext.Provider value={contextValues}>{formOpen ? <TagForm /> : children}</TagFormContext.Provider>;
};

export const useTagFormContext = (): ITagFormContext => useContext(TagFormContext);
