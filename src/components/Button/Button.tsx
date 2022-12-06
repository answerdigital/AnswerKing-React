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
      className={cn('border-2 border-solid border-[#FFC600] bg-[#FFC600] transition duration-500 hover:cursor-pointer', className, {
        'rounded-md py-1 px-2 text-[12px] text-white': size === 'small',
        'rounded-full py-2.5 px-12 text-[20px] font-bold text-[#333F4C] hover:border-[#333F4C] hover:bg-[#333F4C] hover:text-white': size === 'large',
        'cursor-pointer bg-[#5A6675]': active,
      })}
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
