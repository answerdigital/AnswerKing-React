import cn from 'classnames';
import React, { ReactElement } from 'react';
import { useSearch } from './SearchContext';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  'data-testid'?: string;
  hover?: boolean;
  placeholder?: string;
  sizeType?: 'small' | 'medium' | 'large';
}

export const Search = ({
  className = '',
  'data-testid': dataTestId = undefined,
  disabled = false,
  id = undefined,
  hover = true,
  placeholder = 'Search',
  sizeType = 'medium',
}: Props): ReactElement => {
  const setSearchString = useSearch().setSearchString;
  const searchString = useSearch().searchString;

  return (
    <div className={cn('font-poppins relative z-0 text-center', className)} data-testid={dataTestId} id={id}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          aria-hidden="true"
          className="text-grey-darken-3 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className={cn(
          'block h-full w-full',
          'bg-ak-grey-5 border-ak-grey-1 rounded-full border',
          'p-4 pl-12',
          'font-poppins text-ak-grey-1 text-center',
          'placeholder:text-ak-grey-1',
          'focus:border-blue-primary focus:ring-blue-primary',
          {
            'py-1 px-5 text-sm': sizeType === 'small',
            'py-2 px-5 text-base': sizeType === 'medium',
            'py-3 px-12 text-xl': sizeType === 'large',
          },
          { 'hover:border-ak-grey-5 hover:bg-ak-grey-5 transition duration-500 hover:cursor-text': hover }
        )}
        placeholder={placeholder}
        required
        onChange={(e) => setSearchString(e.currentTarget.value)}
        value={searchString}
        disabled={disabled}
      />
    </div>
  );
};
