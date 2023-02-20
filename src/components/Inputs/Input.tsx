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
    <div className={cn('flex w-full flex-col gap-1 text-[16px]', className)}>
      {(label || error) && (
        <Label forId={id} error={error}>
          {label}
        </Label>
      )}
      <input
        type={type ?? 'text'}
        className="text-[14px] text-ak-grey-1 placeholder:text-[#333F4C] focus:pl-1 focus:placeholder:text-[#A2AAB6]"
        id={id}
        ref={ref}
        {...rest}
      ></input>
    </div>
  );
});

Input.displayName = 'Input';
