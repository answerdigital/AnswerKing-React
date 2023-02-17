import cn from 'classnames';
import React, { forwardRef } from 'react';
import { Label } from './Label';

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

export const Select = forwardRef<HTMLSelectElement, Props>(({ options, className, label, error, id, ...rest }, ref) => {
  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      {(label || error) && (
        <Label forId={id} error={error}>
          {label}
        </Label>
      )}
      <select className={cn('w-full rounded-md border bg-white text-center')} defaultValue={options[0]?.value ?? ''} ref={ref} {...rest}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.displayName = 'Select';
