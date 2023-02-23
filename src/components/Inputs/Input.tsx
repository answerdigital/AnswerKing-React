import cn from 'classnames';
import React, { forwardRef } from 'react';
import { Label } from './Label';

interface Props extends React.ComponentPropsWithRef<'input'> {
  label?: string;
  error?: string;
  id: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(({ className, id, label, type, error, ...rest }, ref) => {
  return (
    <div className={cn('flex w-full flex-col gap-1 text-base', className)}>
      {(label || error) && (
        <Label forId={id} error={error}>
          {label}
        </Label>
      )}
      <input
        type={type ?? 'text'}
        className="text-ak-grey-1 text-sm placeholder:text-ak-grey-1 focus:pl-1 focus:placeholder:text-ak-text-grey-4"
        id={id}
        ref={ref}
        {...rest}
      ></input>
    </div>
  );
});

Input.displayName = 'Input';
