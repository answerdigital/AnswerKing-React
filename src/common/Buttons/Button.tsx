import React, { ReactElement } from 'react';
import cn from 'classnames';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  active?: boolean;
  'data-testid'?: string;
  colour?: 'yellow' | 'grey' | 'white' | 'clear';
  hover?: boolean;
}

export default function Button({
  children,
  active = false,
  className = '',
  'data-testid': dataTestId = undefined,
  disabled = false,
  id = undefined,
  onClick = undefined,
  colour = 'grey',
  hover = true,
}: Props): ReactElement {
  return (
    <button
      className={cn(
        'font-poppins',
        'rounded-full transition duration-500',
        {
          'bg-transparent text-inherit': colour === 'clear',
          'border-ak-grey-1 text-ak-grey-1 border border-solid bg-white': colour === 'white',
          'bg-ak-grey-4 text-ak-grey-1': colour === 'grey',
          'text-ak-grey-1 bg-ak-yellow': colour === 'yellow',
          'bg-ak-grey-2 cursor-pointer': active,
          'hover:bg-ak-grey-1 hover:cursor-pointer hover:text-white': hover,
        },
        className
      )}
      data-testid={dataTestId}
      disabled={disabled}
      id={id}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
