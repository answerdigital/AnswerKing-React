import { createContext, useContext, useMemo, useState } from 'react';

interface ISearchContext {
  searchString: string;
  setSearchString: (newSearchString: string) => void;
}

const SearchContext = createContext<ISearchContext>({ searchString: '', setSearchString: () => null });

interface Props {
  children: React.ReactNode;
}

export const SearchContextProvider: React.FC<Props> = ({ children }) => {
  const [searchString, setSearchString] = useState<string>('');
  const contextValues: ISearchContext = useMemo(() => ({ searchString: searchString, setSearchString: setSearchString }), [searchString]);

  return <SearchContext.Provider value={contextValues}>{children}</SearchContext.Provider>;
};

export const useSearch = (): ISearchContext => useContext(SearchContext);
