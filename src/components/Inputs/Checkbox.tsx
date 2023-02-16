import React from 'react';
import cn from 'classnames';

interface Props extends React.ComponentPropsWithRef<'input'> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(({ label, className, id, ...rest }, ref) => {
  return (
    <div className={cn('flex w-full select-none gap-2', className)}>
      <input type="checkbox" id={id} ref={ref} {...rest}></input>
      <label htmlFor={id}>{label}</label>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
