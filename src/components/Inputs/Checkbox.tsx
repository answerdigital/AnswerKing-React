import React, { forwardRef, useState } from 'react';
import cn from 'classnames';
import { CheckBoxIcon } from 'components/Icons/CheckBoxIcon';

interface Props extends React.ComponentPropsWithRef<'input'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(({ label, className, id, ...rest }, ref) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div className={cn('flex w-fit cursor-pointer select-none items-center gap-2', className)} onClick={() => setChecked(!checked)}>
      <input className="hidden" type="checkbox" checked={checked} id={id} ref={ref} {...rest}></input>
      <CheckBoxIcon checked={checked} />
      <span>{label}</span>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
