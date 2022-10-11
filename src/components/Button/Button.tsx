/* eslint-disable react/button-has-type */
import './Button.scss';
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
      className={cn('btn', className, {
        'btn--small': size === 'small',
        'btn--large': size === 'large',
        'btn--active': active,
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
