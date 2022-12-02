import cn from 'classnames';
import React, { ReactElement } from 'react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  active?: boolean;
  'data-testid'?: string;
  size?: 'small' | 'medium' | 'large';
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
}: Props): ReactElement => {
  return (
    <button
      className={cn(
        'bg-[#FFC600] border-solid border-[#FFC600] border-2 transition duration-500 hover:cursor-pointer',
        className,
        {
          'text-[12px] py-1 px-2 rounded-md text-white': size === 'small',
          'text-[20px] py-2.5 px-12 rounded-full text-[#333F4C] hover:bg-[#333F4C] hover:border-[#333F4C] hover:text-white font-bold': size === 'large',
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
