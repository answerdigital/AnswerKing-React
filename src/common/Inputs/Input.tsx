import React, { forwardRef, ReactElement, Ref } from 'react';
import cn from 'classnames';
import Label from './Label';

interface Props extends React.ComponentPropsWithRef<'input'> {
  label?: string;
  error?: string;
  id: string;
}

function Input({ className, id, label, type, error, ...rest }: Props, ref: Ref<HTMLInputElement>): ReactElement {
  return (
    <div className={cn('flex w-full flex-col gap-1 text-base', className)}>
      {(label || error) && (
        <Label forId={id} error={error}>
          {label}
        </Label>
      )}
      <input
        type={type ?? 'text'}
        className="text-ak-grey-1 placeholder:text-ak-grey-1 focus:placeholder:text-ak-text-grey-4 text-sm focus:pl-1"
        id={id}
        ref={ref}
        {...rest}
      />
    </div>
  );
}

export default forwardRef(Input);
