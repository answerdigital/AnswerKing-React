import cn from 'classnames';
import React, { ReactElement } from 'react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  active?: boolean;
  'data-testid'?: string;
  size?: 'small' | 'medium' | 'large';
  colour?: 'yellow' | 'grey' | 'red' | 'clear' | 'white';
  bg?: 'dark' | 'light';
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
  bg = 'light',
  hover = true,
}: Props): ReactElement => {
  return (
    <button
      className={cn(
        'font-poppins',
        'rounded-full transition duration-500',
        {
          'py-1 px-5 text-[14px] ': size === 'small',
          'py-0.5 px-5 text-[22px]': size === 'medium',
          'py-2.5 px-12 text-[20px] font-bold': size === 'large',
          'border-2 border-solid border-transparent bg-transparent': colour === 'clear',
          'border-2 border-solid border-[#333F4C] bg-[white]': colour === 'white',
          'border-2 border-solid border-[#A2AAB6] bg-[#A2AAB6]': colour === 'grey',
          'border-2 border-solid border-[#FFC600] bg-[#FFC600]': colour === 'yellow',
          'border-2 border-solid border-[#f76d6d] bg-[#f76d6d]': colour === 'red',
          'cursor-pointer bg-[#5A6675]': active,
          'text-[#333F4C]': colour !== 'clear' && bg !== 'dark',
          'text-[#A2AAB6]': colour === 'clear' && bg === 'dark',
          'hover:cursor-pointer hover:border-[#333F4C] hover:bg-[#333F4C] hover:text-white': hover,
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
