import cn from 'classnames';
import React, { ReactElement } from 'react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  active?: boolean;
  'data-testid'?: string;
  colour?: 'yellow' | 'grey' | 'white' | 'clear';
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
          'bg-transparent text-inherit': colour === 'clear',
          'border border-solid border-slate-700 bg-white text-slate-700': colour === 'white',
          'bg-[#A2AAB6] text-slate-700' : colour === 'grey',
          'bg-[#FFC600] text-slate-700': colour === 'yellow',
          'cursor-pointer bg-slate-500': active,
          'hover:cursor-pointer hover:bg-slate-700 hover:text-white': hover,
        },
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
