import cn from 'classnames';
import React, { ReactElement } from 'react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  active?: boolean;
  'data-testid'?: string;
  size?: 'small' | 'medium' | 'large';
  colour?: 'yellow' | 'grey' | 'red' | 'clear' | 'clear-border' | 'white';
  hover?: boolean;
}

export const Button = ({
  children,
  active = false,
  className = '',
  'data-testid': dataTestId = undefined,
  disabled = false,
  id = undefined,
  onClick = undefined,
  size = 'medium',
  type = 'button',
  colour = 'grey',
  hover = true,
}: Props): ReactElement => {
  return (
    <button
      className={cn(
        'font-poppins',
        'rounded-full transition duration-500',
        {
          'py-1 px-5 text-sm': size === 'small',
          'py-2 px-5 text-base': size === 'medium',
          'py-3 px-12 text-xl font-bold': size === 'large',
          'border-2 border-solid border-transparent bg-transparent': colour === 'clear',
          'border-2 border-solid border-white bg-transparent': colour === 'clear-border',
          'border-2 border-solid border-slate-700 bg-white': colour === 'white',
          'border-2 border-solid border-slate-400 bg-slate-400': colour === 'grey',
          'border-2 border-solid border-[#FFC600] bg-[#FFC600]': colour === 'yellow',
          'border-2 border-solid border-red-400 bg-red-400': colour === 'red',
          'cursor-pointer bg-slate-500': active,
          'hover:cursor-pointer hover:border-slate-700 hover:bg-slate-700 hover:text-white': hover,
        },
        colour === 'clear' || colour === 'clear-border' ? 'text-inherit' : 'text-slate-700',
        className
      )}
      data-testid={dataTestId}
      disabled={disabled}
      id={id}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
