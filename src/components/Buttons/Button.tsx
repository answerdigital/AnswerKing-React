import cn from 'classnames';
import React, { ReactElement } from 'react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  active?: boolean;
  'data-testid'?: string;
  size?: 'small' | 'medium' | 'large';
  colour?: 'yellow' | 'grey' | 'red' | 'white' | 'clear' | 'clear-border';
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
}: Props): ReactElement => {
  return (
    <button
      className={cn(
        className,
        'font-poppins text-[#333F4C]',
        'rounded-full transition duration-500 hover:border-[#333F4C] hover:bg-[#333F4C] hover:text-white',
        'hover:cursor-pointer',
        {
          'py-1 px-5 text-[14px] ': size === 'small',
          'py-2 px-5 text-[18px]': size === 'medium',
          'py-3 px-12 text-[22px] font-bold': size === 'large',
          'bg-transparent': colour === 'clear',
          'border-2 border-solid border-[#333F4C] bg-[white]': colour === 'white',
          'border-2 border-solid border-[#A2AAB6] bg-[#A2AAB6]': colour === 'grey',
          'border-2 border-solid border-[#FFC600] bg-[#FFC600]': colour === 'yellow',
          'border-2 border-solid border-[#f76d6d] bg-[#f76d6d]': colour === 'red',
          'border-2 border-solid border-[#A2AAB6] bg-transparent text-inherit': colour === 'clear-border',
          'cursor-pointer bg-[#5A6675]': active,
        }
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
