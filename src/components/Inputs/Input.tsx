import cn from 'classnames';
import React from 'react';
import { Label } from './Label';

interface Props extends React.ComponentPropsWithRef<'input'> {
  label?: string;
  error?: string;
  id: string;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(({ className, id, label, type, error, ...rest }, ref) => {
  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      {(label || error) && (
        <Label forId={id} error={error}>
          {label}
        </Label>
      )}
      <input type={type ?? 'text'} className="border-b-2 text-[#333F4C]" id={id} ref={ref} {...rest}></input>
    </div>
  );
});

Input.displayName = 'Input';
