import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import cn from 'classnames';
import { CheckBoxIcon } from 'components/Icons/CheckBoxIcon';

interface Props extends React.ComponentPropsWithRef<'input'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(({ label, className, id, ...rest }, ref) => {
  const innerRef = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState<boolean>(false);

  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  const handleChecked = useCallback(
    (value: boolean) => {
      const checkbox = innerRef.current;

      if (checkbox) {
        setChecked(value);
        checkbox.click();
      }
    },
    [innerRef]
  );

  return (
    <div className={cn('flex w-fit cursor-pointer select-none items-center gap-2', className)} onClick={() => handleChecked(!checked)}>
      <input className="hidden" type="checkbox" id={id} ref={innerRef} {...rest}></input>
      <CheckBoxIcon checked={checked} />
      <span>{label}</span>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
