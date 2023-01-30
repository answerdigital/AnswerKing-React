import React, { ReactElement, useState } from 'react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  'data-testid'?: string;
  options: string[];
}

export const Dropdown = ({
  children,
  className = '',
  'data-testid': dataTestId = undefined,
  id = undefined,
  options = ['options'],
}: Props): ReactElement => {
  const [selected, setSelected] = useState<string>(options[0]);

  return (
    <div className={className} id={id} data-testid={dataTestId}>
      <select className="w-full rounded-md border bg-white text-center" defaultValue={selected}>
        {options.map((op) => {
          return (
            <option key={op} onClick={() => setSelected(op)}>
              {op}
            </option>
          );
        })}
      </select>
      {children}
    </div>
  );
};
