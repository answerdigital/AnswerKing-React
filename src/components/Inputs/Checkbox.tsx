import React, { forwardRef } from 'react';
import cn from 'classnames';

interface Props extends React.ComponentPropsWithRef<'input'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(({ label, className, id, ...rest }, ref) => {
  return (
    <div className={cn('flex w-fit cursor-pointer select-none items-center gap-2', className)}>
      <input type="checkbox" id={id} ref={ref} {...rest}></input>
      <span>{label}</span>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
