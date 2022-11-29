import cn from 'classnames';
import React, { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  active?: boolean;
  className?: string;
  'data-testid'?: string;
  disabled?: boolean;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: 'small' | 'medium' | 'large';
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
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
        'bg-[#FFC600] border-solid border-[#FFC600] rounded-md py-1.5 px-3 text-white border-2 text-[16px] hover:text-[#5A6675] hover:cursor-pointer',
        className,
        {
          'text-[12px] py-1 px-2': size === 'small',
          'text-[20px] py-2 px-4': size === 'large',
          'text-[#5A6675] cursor-pointer': active,
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
