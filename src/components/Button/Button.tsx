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
        'font-poppins border-2 border-solid border-[#FFC600] bg-[#FFC600] transition',
        'rounded-full duration-500 hover:border-[#333F4C] hover:bg-[#333F4C] hover:text-white',
        'hover:cursor-pointer',
        className,
        {
          'py-1 px-5 text-[14px] text-[#333F4C]': size === 'small',
          'mx-5 border-transparent bg-transparent py-0.5 px-5 text-[22px] hover:border-[#A2AAB6] hover:bg-[#A2AAB6] focus:border-[#A2AAB6] focus:bg-[#A2AAB6]':
            size === 'medium',
          'py-2.5 px-12 text-[20px] font-bold text-[#333F4C]': size === 'large',
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
