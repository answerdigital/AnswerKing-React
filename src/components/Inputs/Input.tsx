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
    <div className={cn('flex w-full flex-col gap-1', className)}>
      {(label || error) && (
        <Label forId={id} error={error}>
          {label}
        </Label>
      )}
      <input type={type ?? 'text'} className="text-ak-grey-1 border-b-2" id={id} ref={ref} {...rest}></input>
    </div>
  );
});

Input.displayName = 'Input';
