import React, { forwardRef, ReactElement, Ref, useCallback, useImperativeHandle, useRef, useState } from 'react';
import cn from 'classnames';
import CheckBoxIcon from 'common/Icons/CheckBoxIcon';

interface Props extends React.ComponentPropsWithRef<'input'> {
  label?: string;
}

function Select({ className, label, checked, defaultChecked, id, ...rest }: Props, ref: Ref<HTMLInputElement>): ReactElement {
  const innerRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState<boolean>(checked ?? defaultChecked ?? false);

  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  const handleChecked = useCallback(
    (value: boolean) => {
      const checkbox = innerRef.current;

      if (checkbox) {
        setIsChecked(value);
        checkbox.click();
      }
    },
    [innerRef]
  );

  return (
    <div
      className={cn('flex w-fit cursor-pointer select-none items-center gap-2', className)}
      onClick={() => handleChecked(!isChecked)}
      onKeyDown={() => handleChecked(!isChecked)}
      role="button"
      tabIndex={0}
    >
      <input className="hidden" type="checkbox" id={id} ref={innerRef} {...rest} />
      <CheckBoxIcon checked={isChecked} />
      <span>{label}</span>
    </div>
  );
}

export default forwardRef(Select);
