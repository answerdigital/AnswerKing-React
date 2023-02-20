import React, { forwardRef, ReactElement, Ref } from 'react';
import cn from 'classnames';
import Label from './Label';

interface IOption {
  label: string;
  value: string;
}

interface Props extends React.ComponentPropsWithRef<'select'> {
  options: IOption[];
  label: string;
  error?: string;
  id: string;
}

function Select({ options, className, label, error, id, ...rest }: Props, ref: Ref<HTMLSelectElement>): ReactElement {
  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      {(label || error) && (
        <Label forId={id} error={error}>
          {label}
        </Label>
      )}
      <select className={cn('w-full rounded-md border bg-white text-center')} defaultValue={options[0]?.value ?? ''} ref={ref} {...rest}>
        {options.map(({ value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
