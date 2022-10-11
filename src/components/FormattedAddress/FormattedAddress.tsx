import React, { ReactElement } from 'react';

interface Props {
  address: string;
}

export const FormattedAddress = ({ address }: Props): ReactElement => {
  const lineCount = address.split(',').length;

  return (
    <>
      {address.split(',').map((line, i) => (
        <div key={line}>
          {line}
          {i < lineCount - 1 ? ',' : ''}
        </div>
      ))}
    </>
  );
};
